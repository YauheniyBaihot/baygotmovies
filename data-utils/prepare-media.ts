import {access, mkdir, rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import process from 'process';
import {fileURLToPath} from 'url';

import {generateImages} from './image-generator.ts';
import {generateVideos} from './video-generator.ts';

export interface PrepareMediaOptions {
  inputFolder?: string;
  outputFolder?: string;
  skipImages?: boolean;
  skipVideos?: boolean;
}

export const prepareMedia = async (options?: PrepareMediaOptions): Promise<void> => {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  const flags = new Set(process.argv.slice(2).filter(arg => arg.startsWith('--')));

  if (flags.has('--help') || flags.has('-h')) {
    console.log(`
Usage:
  node data-utils/prepare-media.ts [inputFolder] [outputFolder] [options]

Arguments:
  inputFolder   Source directory containing images and videos (default: "media-sources")
  outputFolder  Target directory for S3-ready media (default: "generated-media")

Options:
  --images-only  Process only images
  --videos-only  Process only videos
  --clean-only   Only cleanup the target directory and exit
  --help, -h     Show this help message
`);
    return;
  }

  const inputFolder = options?.inputFolder || args[0] || 'media-sources';
  const outputFolder = options?.outputFolder || args[1] || 'generated-media';
  const cleanOnly = flags.has('--clean-only');
  const skipImages = options?.skipImages || flags.has('--skip-images') || flags.has('--videos-only');
  const skipVideos = options?.skipVideos || flags.has('--skip-videos') || flags.has('--images-only');

  const resolvedInput = resolve(inputFolder);
  const resolvedOutput = resolve(outputFolder);

  console.log('======================================================');
  console.log('🎬 Media Preparation for S3');
  console.log(`Source Folder: ${resolvedInput}`);
  console.log(`Target Folder: ${resolvedOutput}`);
  console.log('======================================================\n');

  if (!cleanOnly) {
    try {
      await access(resolvedInput);
    } catch {
      console.error(`❌ Source folder "${resolvedInput}" does not exist!`);
      process.exit(1);
    }
  }

  // 1. Cleanup target folder before generation
  console.log(`🧹 Cleaning up "${outputFolder}" folder before generation...`);
  await rm(resolvedOutput, {recursive: true, force: true});
  await mkdir(resolvedOutput, {recursive: true});
  console.log(`✅ Folder "${outputFolder}" cleaned and ready.\n`);

  if (cleanOnly) {
    console.log('Done cleaning folder.');
    return;
  }

  const startTime = Date.now();
  let imageCount = 0;
  let videoCount = 0;

  // 2. Generate images
  if (!skipImages) {
    console.log('🖼️  Step 1: Running image generator...');
    const result = await generateImages({
      inputFolder,
      outputFolder,
    });
    imageCount = result.processedCount;
    console.log(`✅ Image generation completed (${imageCount} images).\n`);
  } else {
    console.log('⏭️  Skipping image generation as requested.\n');
  }

  // 3. Generate videos
  if (!skipVideos) {
    console.log('🎥 Step 2: Running video generator...');
    const result = await generateVideos({
      inputFolder,
      outputFolder,
    });
    videoCount = result.processedCount;
    console.log(`✅ Video generation completed (${videoCount} videos).\n`);
  } else {
    console.log('⏭️  Skipping video generation as requested.\n');
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('======================================================');
  console.log('🎉 Media preparation completed successfully!');
  console.log(`⏱️  Duration: ${durationSec}s`);
  console.log(`📊 Processed: ${imageCount} image(s), ${videoCount} video(s)`);
  console.log(`📁 Output directory: ${resolvedOutput}`);
  console.log('☁️  Ready to upload to S3!');
  console.log('======================================================');
};

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  prepareMedia().catch(error => {
    console.error('Fatal error during media preparation:', error);
    process.exit(1);
  });
}
