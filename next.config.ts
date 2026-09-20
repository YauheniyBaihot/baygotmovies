import {NextConfig} from 'next';
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants';

import i18nextConfig from './next-i18next.config';

const config = (phase: string) => {
  const config = {
    reactStrictMode: true,
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    i18n: i18nextConfig.i18n,
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return config;
  }

  return {
    ...config,
    images: {
      loader: 'custom',
      loaderFile: './src/common/aws-s3-optimized-image-loader.ts',
    },
  } satisfies NextConfig;
};

export default config;
