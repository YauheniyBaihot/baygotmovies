import {existsSync, mkdirSync} from 'fs';
import {glob} from 'glob';
import {parse} from 'path';
import sharp from 'sharp';

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const inputFolder = 'public/version1/me';
const outputFolder = 'public\\version1\\me';

const images = await glob(`${inputFolder}/**/*.jpg`);

console.log(images);

images.forEach(file => {
  [...imageSizes, ...deviceSizes].forEach(size => {
    const replaced = file.replace(inputFolder, outputFolder);
    const filePath = parse(replaced);

    if (existsSync(filePath.dir)) {
      mkdirSync(filePath.dir, {recursive: true});
    }

    void sharp(file).resize(size).toFile(`${filePath.dir}\\${filePath.name}-${size}${filePath.ext}`);
  });
});
