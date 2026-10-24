import {glob, mkdir} from 'node:fs/promises';
import {dirname, parse, relative, resolve} from 'node:path';
import {join} from 'path';
import process from 'process';
import sharp from 'sharp';
import {fileURLToPath} from 'url';

export const DEFAULT_IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];
export const DEFAULT_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
export const SUPPORTED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export interface ImageGeneratorOptions {
  inputFolder?: string;
  outputFolder?: string;
  sizes?: number[];
}

export const generateImages = async (options?: ImageGeneratorOptions): Promise<{processedCount: number}> => {
  const inputFolder = options?.inputFolder || process.argv[2] || 'media-sources';
  const outputFolder = options?.outputFolder || process.argv[3] || 'generated-media';
  const sizes = options?.sizes || [...DEFAULT_IMAGE_SIZES, ...DEFAULT_DEVICE_SIZES];

  console.log('---------------------------------------');
  console.log(`Scanning for images in: ${inputFolder}`);

  let processedCount = 0;

  for await (const file of glob(`${inputFolder}/**/*`)) {
    const parsedFile = parse(file);
    const ext = parsedFile.ext.toLowerCase();

    if (!SUPPORTED_IMAGE_EXTENSIONS.has(ext)) {
      continue;
    }

    const relPath = relative(inputFolder, file);
    const targetPath = join(outputFolder, relPath);
    const targetDir = dirname(targetPath);
    const {name, ext: targetExt} = parse(targetPath);

    await mkdir(targetDir, {recursive: true});
    console.log(`Processing image: ${file} -> ${targetPath}`);

    // Generate resized variants for responsive images
    await Promise.all(
      sizes.map(size => {
        const resizedFilePath = join(targetDir, `${name}-${size}${targetExt}`);
        return sharp(file).resize(size).toFile(resizedFilePath);
      })
    );

    processedCount++;
  }

  console.log('---------------------------------------');
  console.log(`Finished images generation! Processed ${processedCount} image(s).`);

  return {processedCount};
};

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  generateImages().catch(error => {
    console.error('Failed to generate images:', error);
    process.exit(1);
  });
}
