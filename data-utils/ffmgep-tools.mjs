import ffmpeg from 'fluent-ffmpeg';
import {unlink} from 'fs';

const videoCrf = 31;

const ffmpegToWebmFirstPass = async (inputFile, logFileName, crf = videoCrf) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputFile)
      .noAudio()
      //.videoBitrate('0')
      .videoCodec('libvpx-vp9')
      //.format('webm')
      .addOptions([`-crf ${crf}`, '-pass 1', `-passlogfile ${logFileName}`, '-b:v 0', '-f null'])
      .saveToFile('NUL')
      .on('end', () => {
        console.debug('------------------------------------------------------');
        console.debug(`Finished ffmpegToWebmFirstPass for ${inputFile}`);
        resolve();
      })
      .on('start', commandLine => {
        console.debug('------------------------------------------------------');
        console.debug(`Start ffmpegToWebmFirstPass for ${inputFile}`);
        console.debug('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', error => {
        console.debug('------------------------------------------------------');
        console.debug(`Error ffmpegToWebmFirstPass for ${inputFile}`);
        console.error(error.toString());
        reject(error);
      });
  });
};

const ffmpegToWebmSecondPass = async (inputFile, outputFile, logFileName, crf = videoCrf) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputFile)
      .videoBitrate('0')
      .videoCodec('libvpx-vp9')
      .addOptions([`-crf ${crf}`, '-pass 2', `-passlogfile ${logFileName}`])
      .saveToFile(outputFile)
      .on('end', () => {
        console.debug('------------------------------------------------------');
        console.debug(`Finished ffmpegToWebmSecondPass for ${inputFile}`);
        resolve();
      })
      .on('start', commandLine => {
        console.debug('------------------------------------------------------');
        console.debug(`Start ffmpegToWebmSecondPass for ${inputFile}`);
        console.debug('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', error => {
        console.debug('------------------------------------------------------');
        console.debug(`Error ffmpegToWebmSecondPass for ${inputFile}`);
        console.error(error.toString());
        reject(error);
      });
  });
};

const deleteFfmpegLogFile = async logFileName => {
  console.debug('------------------------------------------------------');
  console.debug(`Start deleteFfmpegLogFile`);
  return unlink(`${logFileName}-0.log`, error => {
    console.debug('------------------------------------------------------');
    if (error) {
      console.debug(`Error deleteFfmpegLogFile`);
      console.error(error.toString());
    } else {
      console.debug(`Finished deleteFfmpegLogFile`);
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ffmpegResizeWebm = async (inputFile, outputFile, newHeight, crf = videoCrf) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputFile)
      .noAudio()
      .videoBitrate('0')
      .videoFilter(`scale=-1:${newHeight}`)
      .addOptions([`-crf ${crf}`])
      .saveToFile(outputFile)
      .on('end', () => {
        console.debug('------------------------------------------------------');
        console.debug(`Finished ffmpegResizeWebm for ${inputFile}`);
        resolve();
      })
      .on('start', commandLine => {
        console.debug('------------------------------------------------------');
        console.debug(`Start ffmpegResizeWebm for ${inputFile}`);
        console.debug('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', error => {
        console.debug('------------------------------------------------------');
        console.debug(`Error ffmpegResizeWebm for ${inputFile}`);
        console.error(error.toString());
        reject(error);
      });
  });
};

const ffmpegResizeWebmFirstPass = async (inputFile, newHeight, logFileName, crf = videoCrf) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputFile)
      .noAudio()
      .videoBitrate('0')
      .videoFilter(`scale=-1:${newHeight}`)
      .videoCodec('libvpx-vp9')
      .format('webm')
      .addOptions([`-crf ${crf}`, '-pass 1', `-passlogfile ${logFileName}`])
      .saveToFile('NUL')
      .on('end', () => {
        console.debug('------------------------------------------------------');
        console.debug(`Finished ffmpegResizeWebmFirstPass for ${inputFile}`);
        resolve();
      })
      .on('start', commandLine => {
        console.debug('------------------------------------------------------');
        console.debug(`Start ffmpegResizeWebmFirstPass for ${inputFile}`);
        console.debug('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', error => {
        console.debug('------------------------------------------------------');
        console.debug(`Error ffmpegResizeWebmFirstPass for ${inputFile}`);
        console.error(error.toString());
        reject(error);
      });
  });
};

const ffmpegResizeWebmSecondPath = async (inputFile, outputFile, newHeight, logFileName, crf = videoCrf) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputFile)
      .noAudio()
      .videoBitrate('0')
      .videoFilter(`scale=-1:${newHeight}`)
      .videoCodec('libvpx-vp9')
      .addOptions([`-crf ${crf}`, '-pass 2', `-passlogfile ${logFileName}`])
      .saveToFile(outputFile)
      .on('end', () => {
        console.debug('------------------------------------------------------');
        console.debug(`Finished ffmpegResizeWebmSecondPath for ${inputFile}`);
        resolve();
      })
      .on('start', commandLine => {
        console.debug('------------------------------------------------------');
        console.debug(`Start ffmpegResizeWebmSecondPath for ${inputFile}`);
        console.debug('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', error => {
        console.debug('------------------------------------------------------');
        console.debug(`Error ffmpegResizeWebmSecondPath for ${inputFile}`);
        console.error(error.toString());
        reject(error);
      });
  });
};

const mp4ToWebm = async (input, output) => {
  await ffmpegToWebmFirstPass(input, output);
  await ffmpegToWebmSecondPass(input, output, output);
  await deleteFfmpegLogFile(output);
};

const resizeWebm = async (input, output, newHeight) => {
  await ffmpegResizeWebmFirstPass(input, newHeight, output);
  await ffmpegResizeWebmSecondPath(input, output, newHeight, output);
  await deleteFfmpegLogFile(output);
};

export {mp4ToWebm, resizeWebm};
