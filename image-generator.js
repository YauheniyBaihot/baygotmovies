const glob = require("glob");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const inputFolder = "media";
const outputFolder = "optimized-media";


glob(`${inputFolder}/**/*.jpg`).then((files) => {


  files.forEach((file) => {
    [...imageSizes, ...deviceSizes].forEach((size) => {
      const replaced = file.replace(inputFolder, outputFolder);
      const filePath = path.parse(replaced);

      if (!fs.existsSync(filePath.dir)) {
        fs.mkdirSync(filePath.dir, { recursive: true });
      }

      void sharp(file).resize(size).toFile(`${filePath.dir}\\${filePath.name}-${size}${filePath.ext}`);
    });
  });
});