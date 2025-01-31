import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic = (path === '/signin' || path === '/signup');

  const token = request.cookies.get('token')?.value || '';

  if(isPublic && token) return NextResponse.redirect(new URL('/', request.nextUrl));

  if(!isPublic && !token)return NextResponse.redirect(new URL('/signin', request.nextUrl));
}
 
export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/logout',
    '/dashboard'
  ],
}