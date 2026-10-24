import {glob, mkdir} from 'node:fs/promises';
import {dirname, parse, relative, resolve} from 'node:path';
import {join} from 'path';
import process from 'process';
import {fileURLToPath} from 'url';

import {mp4ToWebm, resizeWebm} from './ffmgep-tools.ts';

export const DEFAULT_IMPORT_VIDEO_HEIGHT = 2160;

export const DEFAULT_VIDEO_HEIGHTS = [
  DEFAULT_IMPORT_VIDEO_HEIGHT / 2, // 1080
  DEFAULT_IMPORT_VIDEO_HEIGHT / 4, // 540
  DEFAULT_IMPORT_VIDEO_HEIGHT / 8, // 270
  DEFAULT_IMPORT_VIDEO_HEIGHT / 16, // 135
];

export const SUPPORTED_VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.mkv', '.avi', '.m4v']);

export interface VideoGeneratorOptions {
  inputFolder?: string;
  outputFolder?: string;
  importVideoHeight?: number;
  videoHeights?: number[];
}

export const generateVideos = async (options?: VideoGeneratorOptions): Promise<{processedCount: number}> => {
  const inputFolder = options?.inputFolder || process.argv[2] || 'media-sources';
  const outputFolder = options?.outputFolder || process.argv[3] || 'generated-media';
  const importVideoHeight = options?.importVideoHeight || DEFAULT_IMPORT_VIDEO_HEIGHT;
  const videoHeights = options?.videoHeights || DEFAULT_VIDEO_HEIGHTS;

  console.log('---------------------------------------');
  console.log(`Scanning for video files in: ${inputFolder}`);

  let processedCount = 0;

  for await (const file of glob(`${inputFolder}/**/*`)) {
    const parsedFile = parse(file);
    const ext = parsedFile.ext.toLowerCase();

    if (!SUPPORTED_VIDEO_EXTENSIONS.has(ext)) {
      continue;
    }

    const relPath = relative(inputFolder, file);
    const targetPath = join(outputFolder, relPath);
    const targetDir = dirname(targetPath);
    const {name} = parse(targetPath);

    await mkdir(targetDir, {recursive: true});

    const webmMasterFile = join(targetDir, `${name}_${importVideoHeight}.webm`);

    console.log('---------------------------------------');
    console.log(`Starting converting: ${file} to webm (height: ${importVideoHeight})`);
    await mp4ToWebm(file, webmMasterFile);
    console.log('---------------------------------------');
    console.log(`Finished converting: ${file} to webm`);

    await Promise.all(
      videoHeights.map(async newHeight => {
        const resizedWebm = join(targetDir, `${name}_${newHeight}.webm`);
        console.log('---------------------------------------');
        console.log(`Starting resize: ${file} to height ${newHeight}`);
        await resizeWebm(webmMasterFile, resizedWebm, newHeight);
        console.log('---------------------------------------');
        console.log(`Finished resize: ${file} to height ${newHeight}`);
      })
    );

    processedCount++;
  }

  console.log('---------------------------------------');
  console.log(`Finished videos generation! Processed ${processedCount} video(s).`);

  return {processedCount};
};

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  generateVideos().catch(error => {
    console.error('Failed to generate videos:', error);
    process.exit(1);
  });
}
