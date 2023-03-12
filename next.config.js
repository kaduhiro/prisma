/** @type {import('next').NextConfig} */
const path = require('path');

const urlPrefix = process.env.URL_PREFIX ?? '';

const nextConfig = {
  reactStrictMode: true,
  basePath: urlPrefix,
  assetPrefix: `${urlPrefix}/`,
  publicRuntimeConfig: {
    urlPrefix: urlPrefix,
  },
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      ['@']: path.join(__dirname, 'src'),
    };

    return config;
  },
};

module.exports = nextConfig;
