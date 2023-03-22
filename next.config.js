/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    loader: "custom",
    loaderFile: "./src/common/aws-s3-optimized-image-loader.ts",
  }
};
