/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Habilita export estático para hospedagem compartilhada
  trailingSlash: true, // Adiciona barra no final das URLs (compatível com servidores estáticos)
  compiler: {
    styledComponents: true,
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true, // Necessário para export estático
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
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
