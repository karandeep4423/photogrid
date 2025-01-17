import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Regex to match image file extensions
  const staticFileRegex = /\.(jpg|jpeg|png|gif|svg|webp|bmp)$/i;

  // If the request is for an image, rewrite to CloudFront
  if (staticFileRegex.test(pathname)) {
    const cloudFrontURL = `https://d1zs065awsyu72.cloudfront.net${pathname}`;
    return NextResponse.rewrite(new URL(cloudFrontURL));
  }

  // For other requests, proceed as usual
  return NextResponse.next();
}
