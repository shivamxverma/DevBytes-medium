import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getDateFromToken } from './services/getDateFromToken';
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic = (path === '/signin' || path === '/signup');

  const token = request.cookies.get('token')?.value || '';

  const UserId = getDateFromToken(request);

  if(UserId) localStorage.setItem('UserId', UserId);

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