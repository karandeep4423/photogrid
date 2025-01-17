/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'd1zs065awsyu72.cloudfront.net',
          // hostname: "photo-grid.org.s3.eu-west-3.amazonaws.com"
        },
      ],
    },
    async rewrites() {
    return [
      {
        source: '/:path*', // Matches all paths
        has: [
          {
            type: 'header',
            key: 'x-cloudfront-s3-origin',
          },
        ],
        destination: 'https://photo-grid.org/:path*', // Send directly to S3 via CloudFront
      },
    ];
  },
  };
  
  module.exports = nextConfig;
  
