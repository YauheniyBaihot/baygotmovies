import {access, glob, mkdir} from 'fs/promises';
import {parse} from 'path';
import sharp from 'sharp';

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const inputFolder = 'public/v1';
const outputFolder = 'public/version2';

const inputFolderReplaced = inputFolder.replace('/', '\\');
const outputFolderReplaced = outputFolder.replace('/', '\\');

for await (const file of glob(`./${inputFolder}/**/*.jpg`)) {
  console.log('Processing: ', file);

  for (const size of [...imageSizes, ...deviceSizes]) {
    const replaced = file.replace(inputFolderReplaced, outputFolderReplaced);
    const filePath = parse(replaced);

    try {
      await access(filePath.dir);
    } catch {
      await mkdir(filePath.dir, {recursive: true});
    }

    void sharp(file).resize(size).toFile(`${filePath.dir}\\${filePath.name}-${size}${filePath.ext}`);
  }
}
