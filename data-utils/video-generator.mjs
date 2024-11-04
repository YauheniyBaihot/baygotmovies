import {mkdir} from 'fs';
import {glob} from 'glob';
import {join, parse} from 'path';

import {mp4ToWebm, resizeWebm} from './ffmgep-tools.mjs';

const importVideoHeight = 2160;

const videoHeights = [importVideoHeight / 2, importVideoHeight / 4, importVideoHeight / 8, importVideoHeight / 16];

const inputFolder = 'public/v1/drive-download/missing';
const outputFolder = 'public\\v1\\drive-download\\missing-results';

const videos = await glob(`${inputFolder}/**/*.mp4`);

const makeDir = async () => {
  return new Promise((resolve, reject) => {
    mkdir(outputFolder, {recursive: true}, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

await makeDir();

await Promise.all(
  videos
    .map(file => ({file, path: parse(file)}))
    .map(({file, path}) => {
      const run = async () => {
        const webpFileName = join(outputFolder, `${path.name}_${importVideoHeight}.webm`);
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
              await resizeWebm(webpFileName, join(outputFolder, `${path.name}_${newHeight}.webm`), newHeight);

              console.log('---------------------------------------');
              console.log(`Finish resize: ${file} to ${newHeight}`);
            };

            return runResize();
          })
        );
      };

      return run();
    })
);

console.log('---------------------------------------');
console.log('All finished');
