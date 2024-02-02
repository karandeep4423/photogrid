/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          // hostname: 'dnid0r1bm9raq.cloudfront.net',
          hostname: "photo-grid.org.s3.eu-west-3.amazonaws.com"
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  
