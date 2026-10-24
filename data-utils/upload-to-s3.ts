import {S3Client} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';
import {createReadStream} from 'node:fs';
import {access, glob, stat} from 'node:fs/promises';
import {extname, relative, resolve, sep} from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

// Load environment variables from .env and .env.local if present
for (const envFile of ['.env', '.env.local']) {
  try {
    process.loadEnvFile(envFile);
  } catch {
    // File not found or unreadable, ignore
  }
}

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

const getContentType = (filename: string): string => {
  const ext = extname(filename).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export interface UploadOptions {
  versionFolder?: string;
  sourceDir?: string;
  bucket?: string;
  region?: string;
  dryRun?: boolean;
  concurrency?: number;
}

export const uploadToS3 = async (options?: UploadOptions): Promise<void> => {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  const flags = new Set(process.argv.slice(2).filter(arg => arg.startsWith('--')));

  if (flags.has('--help') || flags.has('-h')) {
    console.log(`
Usage:
  node data-utils/upload-to-s3.ts [versionFolder] [options]
  npm run upload:s3 [versionFolder] [options]

Arguments:
  versionFolder   S3 folder/prefix for the release (e.g. "version1", "version2")
                  Defaults to $S3_VERSION or "version1"

Options:
  --bucket=<name>     S3 bucket name (or set AWS_S3_BUCKET in .env.local)
  --region=<region>   AWS region (or set AWS_REGION in .env.local, default: "eu-central-1")
  --source=<dir>      Local folder to upload from (default: "generated-media")
  --concurrency=<n>   Concurrent upload limit (default: 4)
  --dry-run           List files that would be uploaded without actually uploading
  --help, -h          Show this help message

Environment Variables (.env.local):
  AWS_S3_BUCKET          Target S3 bucket name
  AWS_REGION             AWS Region (e.g. eu-central-1)
  AWS_ACCESS_KEY_ID      AWS Access Key ID
  AWS_SECRET_ACCESS_KEY  AWS Secret Access Key
`);
    return;
  }

  // Parse options
  const getFlagValue = (prefix: string): string | undefined => {
    for (const arg of process.argv.slice(2)) {
      if (arg.startsWith(`${prefix}=`)) {
        return arg.substring(prefix.length + 1);
      }
    }
    return undefined;
  };

  const versionFolder = (options?.versionFolder || args[0] || getFlagValue('--version') || process.env.S3_VERSION || 'version1').replace(/^\/+|\/+$/g, '');
  const sourceDir = options?.sourceDir || getFlagValue('--source') || 'generated-media';
  const bucket = options?.bucket || getFlagValue('--bucket') || process.env.AWS_S3_BUCKET || process.env.S3_BUCKET_NAME;
  const region = options?.region || getFlagValue('--region') || process.env.AWS_REGION || 'eu-central-1';
  const dryRun = options?.dryRun || flags.has('--dry-run');
  const concurrency = options?.concurrency || parseInt(getFlagValue('--concurrency') || '4', 10);

  const resolvedSource = resolve(sourceDir);

  console.log('======================================================');
  console.log('☁️  Upload Media to AWS S3');
  console.log(`Source Folder : ${resolvedSource}`);
  console.log(`Target S3 Path: s3://${bucket || '<MISSING_BUCKET>'}/${versionFolder}/`);
  console.log(`Region        : ${region}`);
  console.log(`Concurrency   : ${concurrency}`);
  console.log(`Dry Run       : ${dryRun ? 'YES (no files will be uploaded)' : 'NO'}`);
  console.log('======================================================\n');

  // Verify source folder exists
  try {
    await access(resolvedSource);
  } catch {
    console.error(`❌ Source directory "${resolvedSource}" does not exist.`);
    console.error('Please run "npm run prepare:media" first to generate media files.');
    process.exit(1);
  }

  // Find all files in source folder
  const files: {absolutePath: string; s3Key: string; size: number; contentType: string}[] = [];
  for await (const file of glob(`${sourceDir}/**/*`)) {
    const fileStat = await stat(file);
    if (fileStat.isFile()) {
      const rel = relative(sourceDir, file);
      // Ensure S3 key uses forward slashes regardless of OS
      const s3SubPath = rel.split(sep).join('/');
      const s3Key = `${versionFolder}/${s3SubPath}`;
      files.push({
        absolutePath: file,
        s3Key,
        size: fileStat.size,
        contentType: getContentType(file),
      });
    }
  }

  if (files.length === 0) {
    console.warn(`⚠️  No files found in "${resolvedSource}". Run "npm run prepare:media" first.`);
    return;
  }

  const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
  console.log(`Found ${files.length} file(s) to upload (Total: ${formatBytes(totalBytes)}).\n`);

  if (dryRun) {
    console.log('--- Dry Run File List ---');
    files.forEach((f, idx) => {
      console.log(`  [${idx + 1}/${files.length}] ${f.s3Key} (${formatBytes(f.size)}, ${f.contentType})`);
    });
    console.log('\nDry run completed.');
    return;
  }

  // Validate bucket name
  if (!bucket) {
    console.error('❌ S3 bucket name is missing!');
    console.error('Please set AWS_S3_BUCKET in your .env.local file or pass --bucket=<name>');
    console.error('Example (.env.local):');
    console.error('  AWS_S3_BUCKET=my-media-bucket');
    process.exit(1);
  }

  const s3Client = new S3Client({
    region,
  });

  const startTime = Date.now();
  let uploadedCount = 0;
  let uploadedBytes = 0;

  // Queue upload runner with concurrency limit
  const queue = [...files];
  const workers = Array.from({length: Math.min(concurrency, files.length)}, async () => {
    while (queue.length > 0) {
      const fileInfo = queue.shift();
      if (!fileInfo) break;

      const fileStream = createReadStream(fileInfo.absolutePath);

      const parallelUpload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucket,
          Key: fileInfo.s3Key,
          Body: fileStream,
          ContentType: fileInfo.contentType,
          CacheControl: 'public, max-age=31536000, immutable',
        },
      });

      try {
        await parallelUpload.done();
        uploadedCount++;
        uploadedBytes += fileInfo.size;
        console.log(`[${uploadedCount}/${files.length}] Uploaded: ${fileInfo.s3Key} (${formatBytes(fileInfo.size)})`);
      } catch (error) {
        console.error(`❌ Failed to upload ${fileInfo.s3Key}:`, error);
        throw error;
      }
    }
  });

  await Promise.all(workers);

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n======================================================');
  console.log('🎉 Upload to S3 completed successfully!');
  console.log(`⏱️  Duration  : ${durationSec}s`);
  console.log(`📦 Files     : ${uploadedCount} file(s)`);
  console.log(`📊 Total Size: ${formatBytes(uploadedBytes)}`);
  console.log(`🌐 Target S3 : s3://${bucket}/${versionFolder}/`);
  console.log(`🔗 S3 URL    : https://${bucket}.s3.${region}.amazonaws.com/${versionFolder}/`);
  console.log('======================================================');
};

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  uploadToS3().catch(error => {
    console.error('\nUpload failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
