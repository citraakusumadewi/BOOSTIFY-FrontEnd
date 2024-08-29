import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // Debugging output to track the token and path
  console.log('Token:', token);  
  console.log('Pathname:', pathname);  

  // Protected routes
  const protectedRoutes = ['/HomePage', '/Profile', '/Recap', '/LiveReport'];

  // If no token exists and user tries to access a protected route, redirect to login
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    console.log('Redirecting to SignIn');
    return NextResponse.redirect(new URL('/SignIn', req.url));
  }

  // Allow request to continue if token exists or route does not require auth
  console.log('Allowing request to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: ['/HomePage', '/Profile', '/Recap', '/LiveReport'],
};
