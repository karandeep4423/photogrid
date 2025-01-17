/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*', // Ensure all non-image requests are handled by Next.js
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1zs065awsyu72.cloudfront.net', // Allow images from CloudFront
      },
    ],
  },
};

module.exports = nextConfig;

