/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3-sa-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@core': require('path').resolve(__dirname, 'src/core'),
      '@brands': require('path').resolve(__dirname, 'src/brands'),
      '@content': require('path').resolve(__dirname, 'content'),
    };
    return config;
  },
};

module.exports = nextConfig;
