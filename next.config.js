module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://d1zs065awsyu72.cloudfront.net/:path*'
      }
    ]
  }
}
  
