import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  const accessToken = request.cookies.get('authorization-token');

  if (url === '/') {
    const response = NextResponse.next();
    response.headers.set('X-Skip-Icons', 'true');
    return response;
  }
  if (
    !accessToken &&
    url !== '/signup' &&
    url !== '/login' &&
    url !== '/kakaoLogin' &&
    url !== '/find-password-email' &&
    url !== '/find-password-question' &&
    url !== '/find-password-newpassword' &&
    url !== '/plan/initial'
  ) {
    // 아예 로그인 경력이 없을 때
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)']
};
