// @ts-check

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {i18n} = require('./next-i18next.config');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = phase => {
  const config = {
    reactStrictMode: true,
    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
    i18n,
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
  };
};
