import {glob, mkdir} from 'node:fs/promises';
import {join, parse} from 'node:path';

import {extractFirstFrameToJpg} from './ffmgep-tools.ts';

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.mkv', '.webm', '.avi', '.m4v']);
const targetFolder = process.argv[2] || 'media-sources';

console.log('---------------------------------------');
console.log(`Scanning for video files in: ${targetFolder}`);

let processedCount = 0;

for await (const file of glob(`${targetFolder}/**/*`)) {
  const filePath = parse(file);
  const ext = filePath.ext.toLowerCase();

  if (!VIDEO_EXTENSIONS.has(ext)) {
    continue;
  }

  const outputJpg = join(filePath.dir, `${filePath.name}.jpg`);

  try {
    await mkdir(filePath.dir, {recursive: true});
    console.log('---------------------------------------');
    console.log(`Generating poster frame: ${file} -> ${outputJpg}`);
    await extractFirstFrameToJpg(file, outputJpg);
    processedCount++;
  } catch (error) {
    console.error(`Failed to process ${file}:`, error);
  }
}

console.log('---------------------------------------');
console.log(`All finished! Generated ${processedCount} poster image(s).`);
