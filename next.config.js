module.exports = {
  async rewrites() {
    return [
      // Handle image files
      {
        source: '/:path*\\.(jpg|jpeg|png|gif|svg|webp|bmp)',
        destination: 'https://d1zs065awsyu72.cloudfront.net/:path*'
      },
      // Handle all other paths
      // {
      //   source: '/:path*',
      //   destination: '/simple/:path*'
      // }
    ]
  }
}
