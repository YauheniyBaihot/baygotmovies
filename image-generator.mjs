import { glob } from 'glob';
import sharp from 'sharp';
import { parse } from 'path';
import { mkdirSync, existsSync } from 'fs';

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const inputFolder = 'media';
const outputFolder = 'public\\optimized-media';

const images = await glob(`${inputFolder}/**/*.jpg`);

images.forEach((file) => {
  [...imageSizes, ...deviceSizes].forEach((size) => {
    const replaced = file.replace(inputFolder, outputFolder);
    const filePath = parse(replaced);

    if (existsSync(filePath.dir)) {
      mkdirSync(filePath.dir, { recursive: true });
    }

    void sharp(file).resize(size).toFile(`${filePath.dir}\\${filePath.name}-${size}${filePath.ext}`);
  });
});

