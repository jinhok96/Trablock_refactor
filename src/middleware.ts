import { NextRequest, NextResponse } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import { APP_URLS } from '@/libs/constants/appUrls';

export function middleware(request: NextRequest) {
  const currentPage = request.nextUrl.pathname;
  const authorizationToken = request.cookies.get(HEADERS.AUTHORIZATION_TOKEN);

  if (currentPage === APP_URLS.HOME) {
    const response = NextResponse.next();
    response.headers.set(HEADERS.X_SKIP_ICONS, 'true');
    return response;
  }

  // 경로 수정
  if (
    !authorizationToken &&
    currentPage !== '/signup' &&
    currentPage !== '/login' &&
    currentPage !== '/kakaoLogin' &&
    currentPage !== '/find-password-email' &&
    currentPage !== '/find-password-question' &&
    currentPage !== '/find-password-newpassword' &&
    currentPage !== '/plan/initial'
  ) {
    // 아예 로그인 경력이 없을 때
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)']
};
