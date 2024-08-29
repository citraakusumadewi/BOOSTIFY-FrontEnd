import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // If no token exists and user tries to access a protected route, redirect to login
  if (!token && pathname.startsWith('/homepage')) {
    return NextResponse.redirect(new URL('/SignIn', req.url));
  }

  // Allow request to continue if token exists or route does not require auth
  return NextResponse.next();
}

export const config = {
  matcher: ['/homepage'],
};