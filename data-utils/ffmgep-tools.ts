import {execFile} from 'child_process';
import {unlink} from 'fs/promises';

const videoCrf = 31;

/**
 * Runs ffmpeg with the given arguments, returning a promise.
 * Logs the command on start, and stdout/stderr on completion or error.
 */
const runFfmpeg = (args: string[], label: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const command = `ffmpeg ${args.join(' ')}`;
    console.debug('------------------------------------------------------');
    console.debug(`Start ${label}`);
    console.debug('Spawned ffmpeg with command: ' + command);

    execFile('ffmpeg', args, {maxBuffer: 10 * 1024 * 1024}, (error, stdout, stderr) => {
      if (error) {
        console.debug('------------------------------------------------------');
        console.debug(`Error ${label}`);
        console.error(stderr || error.message);
        reject(error);
      } else {
        console.debug('------------------------------------------------------');
        console.debug(`Finished ${label}`);
        resolve();
      }
    });
  });
};

const nullDevice = process.platform === 'win32' ? 'NUL' : '/dev/null';

const ffmpegToWebmFirstPass = async (inputFile: string, logFileName: string, crf: number = videoCrf): Promise<void> => {
  const args = ['-y', '-i', inputFile, '-pix_fmt', 'yuv420p', '-an', '-c:v', 'libvpx-vp9', '-crf', String(crf), '-b:v', '0', '-pass', '1', '-passlogfile', logFileName, '-f', 'null', nullDevice];
  return runFfmpeg(args, `ffmpegToWebmFirstPass for ${inputFile}`);
};

const ffmpegToWebmSecondPass = async (inputFile: string, outputFile: string, logFileName: string, crf: number = videoCrf): Promise<void> => {
  const args = ['-y', '-i', inputFile, '-pix_fmt', 'yuv420p', '-b:v', '0', '-c:v', 'libvpx-vp9', '-crf', String(crf), '-pass', '2', '-passlogfile', logFileName, outputFile];
  return runFfmpeg(args, `ffmpegToWebmSecondPass for ${inputFile}`);
};

const deleteFfmpegLogFile = async (logFileName: string): Promise<void> => {
  console.debug('------------------------------------------------------');
  console.debug(`Start deleteFfmpegLogFile`);
  try {
    await unlink(`${logFileName}-0.log`);
    console.debug('------------------------------------------------------');
    console.debug(`Finished deleteFfmpegLogFile`);
  } catch (error: unknown) {
    console.debug('------------------------------------------------------');
    console.debug(`Error deleteFfmpegLogFile`);
    console.error(error instanceof Error ? error.message : String(error));
  }
};

const ffmpegResizeWebmFirstPass = async (inputFile: string, newHeight: number, logFileName: string, crf: number = videoCrf): Promise<void> => {
  const args = ['-y', '-i', inputFile, '-an', '-b:v', '0', '-vf', `scale=-1:${newHeight}`, '-c:v', 'libvpx-vp9', '-crf', String(crf), '-pass', '1', '-passlogfile', logFileName, '-f', 'null', nullDevice];
  return runFfmpeg(args, `ffmpegResizeWebmFirstPass for ${inputFile}`);
};

const ffmpegResizeWebmSecondPath = async (inputFile: string, outputFile: string, newHeight: number, logFileName: string, crf: number = videoCrf): Promise<void> => {
  const args = ['-y', '-i', inputFile, '-an', '-b:v', '0', '-vf', `scale=-1:${newHeight}`, '-c:v', 'libvpx-vp9', '-crf', String(crf), '-pass', '2', '-passlogfile', logFileName, outputFile];
  return runFfmpeg(args, `ffmpegResizeWebmSecondPath for ${inputFile}`);
};

const mp4ToWebm = async (input: string, output: string): Promise<void> => {
  await ffmpegToWebmFirstPass(input, output);
  await ffmpegToWebmSecondPass(input, output, output);
  await deleteFfmpegLogFile(output);
};

const resizeWebm = async (input: string, output: string, newHeight: number): Promise<void> => {
  await ffmpegResizeWebmFirstPass(input, newHeight, output);
  await ffmpegResizeWebmSecondPath(input, output, newHeight, output);
  await deleteFfmpegLogFile(output);
};

const extractFirstFrameToJpg = async (inputFile: string, outputFile: string): Promise<void> => {
  const args = ['-y', '-ss', '0', '-i', inputFile, '-frames:v', '1', '-q:v', '1', '-qmin', '1', '-update', '1', outputFile];
  return runFfmpeg(args, `extractFirstFrameToJpg for ${inputFile}`);
};

export {extractFirstFrameToJpg, mp4ToWebm, resizeWebm};
