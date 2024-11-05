import {ImageLoader} from 'next/image';

const awsS3optimizedImageLoader: ImageLoader = ({src, width}) => {
  const extenstionIndex = src.lastIndexOf('.');

  let newPath = src;

  if (extenstionIndex > -1) {
    newPath = src.substring(0, extenstionIndex) + `-${width}` + src.substring(extenstionIndex, src.length);
  }

  return new URL(newPath, 'https://d2lbltjxdb58wg.cloudfront.net/').href;
};

export default awsS3optimizedImageLoader;
