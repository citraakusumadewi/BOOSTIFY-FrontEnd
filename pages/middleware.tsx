import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const isLogin = false;
  if (!isLogin) {
    return NextResponse.redirect(new URL('/SignIn', request.url))
  }
}
 
export const config = {
  matcher: ['./HomePage', './LiveReport', './Recap', './Profile'],
}