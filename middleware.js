import { NextResponse } from 'next/server';
import NextAuthMiddleware from 'next-auth/middleware';
export { default } from 'next-auth/middleware'

export const config = { matcher: ['/profile/:path*','/uye/:path+'] }

export function middleware(request) {
    const response = NextResponse.next();
    if (!request.nextUrl.pathname.startsWith('/api')) {
        response.headers.set('Cache-Control', 'max-age=31536000');
    }

    return NextAuthMiddleware(request, response);
}