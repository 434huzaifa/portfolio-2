/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json5$/i,
      type: 'json',
      parser: {
        // Allow importing JSON5 files as plain JSON modules
        parse: require('json5').parse,
      },
    });
    return config;
  },
}

module.exports = nextConfig
