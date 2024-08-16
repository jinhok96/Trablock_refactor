import { NextRequest, NextResponse } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import { APP_URLS } from '@/libs/constants/appUrls';

const PAGE_LIST_WITHOUT_AUTH_TOKEN = [APP_URLS.JOIN, APP_URLS.LOGIN, APP_URLS.PW_INQUIRY];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authorizationToken = request.cookies.get(HEADERS.AUTHORIZATION_TOKEN);

  if (path === APP_URLS.HOME) {
    const response = NextResponse.next();
    response.headers.set(HEADERS.X_HIDE_SEARCH_UI, 'true');
    return response;
  }

  // 로그인 상태가 아닐 때
  if (!authorizationToken && !PAGE_LIST_WITHOUT_AUTH_TOKEN.includes(path)) {
    return NextResponse.redirect(new URL(APP_URLS.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
