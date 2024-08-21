import { decode, JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import userMiddlewareAuthenticationServices from '@/apis/services/user/authentication/fetchMiddleware';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { setCookieAuthToken } from '@/libs/utils/cookieAuthToken';

const PAGE_LIST_WITHOUT_AUTH_TOKEN = [APP_URLS.JOIN, APP_URLS.LOGIN, APP_URLS.PW_INQUIRY];

/**
 * 페이지 전처리 로직
 * 1. 모든 페이지에서 토큰 검증
 * - 1.1 auth 또는 refresh 없을 때 !isHome이고 !isPageWithoutAuthToken이면 로그인 페이지로 리디렉션
 * - 1.2 auth 만료되고 refresh 있으면 auth 재발급 (refresh는 그대로)
 */

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  const params = req.nextUrl.search;

  const isHome = path === APP_URLS.HOME;
  const isPageWithoutAuthToken = PAGE_LIST_WITHOUT_AUTH_TOKEN.some((page) => path.startsWith(page));

  const authorizationToken = req.cookies.get(HEADERS.AUTHORIZATION_TOKEN)?.value || '';
  const refreshToken = req.cookies.get(HEADERS.REFRESH_TOKEN)?.value || '';

  // 1.1 auth 또는 refresh 없을 때 !isHome이고 !isPageWithoutAuthToken이면 로그인 페이지로 리디렉션
  if ((!authorizationToken || !refreshToken) && !isHome && !isPageWithoutAuthToken) {
    const fullPath = path + params;
    const nextParam = !isHome ? `?${APP_QUERIES.NEXT}=${fullPath}` : '';
    return NextResponse.redirect(new URL(APP_URLS.LOGIN + nextParam, req.url));
  }

  // isAuthorizationTokenExpired: auth가 있고 만료되었을 때 true 반환
  // auth가 없으면 undefined, 유효하면 false 반환 (모두 falsy)
  const decodedAuthorizationToken = decode(authorizationToken) as JwtPayload | undefined;
  const isAuthorizationTokenExpired =
    decodedAuthorizationToken?.exp && Date.now() >= decodedAuthorizationToken?.exp * 1000;

  // 1.2 auth 만료되고 refresh 있으면 auth 재발급 (refresh는 그대로)
  if (isAuthorizationTokenExpired && refreshToken) {
    const response = await userMiddlewareAuthenticationServices.getReissueToken(req);
    if (response.body.data?.is_reissue) {
      const isAutoLogin = req.cookies.get(HEADERS.AUTO_LOGIN)?.value || false;
      setCookieAuthToken(response, isAutoLogin, res);
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
