// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Handle image files by redirecting to CloudFront
      {
        source: '/:path*\\.(jpg|jpeg|png|gif|svg|webp|bmp)',
        destination: 'https://d1zs065awsyu72.cloudfront.net/:path*'
      },
      // Handle all other paths normally
      {
        source: '/:path*',
        destination: '/:path*'
      }
    ];
  }
};

module.exports = nextConfig;