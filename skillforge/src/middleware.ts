import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  // Only protect specific routes
  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/api/auth/signin', nextUrl.origin));
  }

  if (pathname.startsWith('/admin') && (!isLoggedIn || req.auth?.user?.role !== 'admin')) {
    return NextResponse.redirect(new URL('/unauthorized', nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Only run on routes we want to protect
    '/dashboard/:path*',
    '/admin/:path*'
  ],
};
