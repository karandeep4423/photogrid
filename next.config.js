/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dnid0r1bm9raq.cloudfront.net',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  
