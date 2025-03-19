const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx'],
  images: {
    domains: ['fakestoreapi.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60
  },
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.json', ...config.resolve.extensions]
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.join(__dirname, 'components'),
      '@hooks': path.join(__dirname, 'hooks'),
      '@context': path.join(__dirname, 'context'),
      '@theme': path.join(__dirname, 'theme'),
      '@styles': path.join(__dirname, 'styles'),
      '@data': path.join(__dirname, 'data')
    }
    return config
  }
}

module.exports = nextConfig
