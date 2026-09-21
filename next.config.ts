import {NextConfig} from 'next';
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants';

const config = (phase: string) => {
  const baseConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  };

  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return baseConfig;
  // }

  return {
    ...baseConfig,
    images: {
      loader: 'custom',
      loaderFile: './src/common/aws-s3-optimized-image-loader.ts',
    },
  } satisfies NextConfig;
};

export default config;
