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
  };
  
  module.exports = nextConfig;
  
