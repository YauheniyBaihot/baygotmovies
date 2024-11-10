import {access} from 'fs/promises';
import {glob, mkdir} from 'node:fs/promises';
import {join, parse} from 'path';

import {mp4ToWebm, resizeWebm} from './ffmgep-tools.mjs';

const importVideoHeight = 2160;

const videoHeights = [importVideoHeight / 2, importVideoHeight / 4, importVideoHeight / 8, importVideoHeight / 16];

const inputFolder = 'public/v1';
const outputFolder = 'public/version2';

const inputFolderReplaced = inputFolder.replace('/', '\\');
const outputFolderReplaced = outputFolder.replace('/', '\\');

for await (const file of glob(`./${inputFolder}/**/*.mp4`)) {
  const replaced = file.replace(inputFolderReplaced, outputFolderReplaced);
  const filePath = parse(replaced);

  const webpFileName = join(filePath.dir, `${filePath.name}_${importVideoHeight}.webm`);

  try {
    await access(filePath.dir);
  } catch {
    await mkdir(filePath.dir, {recursive: true});
  }

  console.log('---------------------------------------');
  console.log(`Starting converting: ${file} to webm`);
  await mp4ToWebm(file, webpFileName);
  console.log('---------------------------------------');
  console.log(`Finished converting: ${file} to webm`);

  await Promise.all(
    videoHeights.map(newHeight => {
      const runResize = async () => {
        console.log('---------------------------------------');
        console.log(`Starting resize: ${file} to ${newHeight}`);
        await resizeWebm(webpFileName, join(filePath.dir, `${filePath.name}_${newHeight}.webm`), newHeight);

        console.log('---------------------------------------');
        console.log(`Finish resize: ${file} to ${newHeight}`);
      };

      return runResize();
    })
  );
}

console.log('---------------------------------------');
console.log('All finished');
