import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Match requests for common static file extensions (S3 resources)
  const staticFileRegex = /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i;

  if (staticFileRegex.test(pathname)) {
    // Redirect to the S3 origin (CloudFront distribution URL)
    return NextResponse.rewrite(
      new URL(`https://d1zs065awsyu72.cloudfront.net${pathname}`)
    );
  }

  // Allow other requests to proceed as usual
  return NextResponse.next();
}
