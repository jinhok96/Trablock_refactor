import { NextRequest, NextResponse } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import userMiddlewareAuthenticationServices from '@/apis/services/user/authentication/fetchMiddleware';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { setNextCookieAuthToken } from '@/libs/utils/cookies/nextCookieAuthToken';
import { jwtDecode } from '@/libs/utils/jwtDecode';

const PAGE_LIST_WITHOUT_AUTH_TOKEN = [
  APP_URLS.JOIN,
  APP_URLS.LOGIN,
  APP_URLS.PW_INQUIRY,
  APP_URLS.TERMS_OF_SERVICE,
  APP_URLS.PRIVACY_POLICY
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  const params = req.nextUrl.search;

  const isHome = path === APP_URLS.HOME;
  const isPageWithoutAuthToken = PAGE_LIST_WITHOUT_AUTH_TOKEN.some((page) => path.startsWith(page));

  const authorizationToken = req.cookies.get(HEADERS.AUTHORIZATION_TOKEN)?.value || '';
  const refreshToken = req.cookies.get(HEADERS.REFRESH_TOKEN)?.value || '';

  const handleRedirectLoginPage = () => {
    if (isHome || isPageWithoutAuthToken) return res;
    const fullPath = path + params;
    const nextParam = !isHome ? `?${APP_QUERIES.NEXT}=${fullPath}` : '';
    return NextResponse.redirect(new URL(APP_URLS.LOGIN + nextParam, req.url));
  };

  // auth 또는 refresh 없을 경우 로그인 페이지 리디렉션
  if (!authorizationToken || !refreshToken) return handleRedirectLoginPage();

  const decodedAuthorizationToken = jwtDecode(authorizationToken);
  const decodedRefreshToken = jwtDecode(refreshToken);

  // auth 또는 refresh가 잘못된 형식일 경우 로그인 페이지 리디렉션
  if (!decodedAuthorizationToken.isValid || !decodedRefreshToken.isValid) return handleRedirectLoginPage();

  // refresh 만료된 경우 로그인 페이지 리디렉션
  if (decodedRefreshToken.isExpired) return handleRedirectLoginPage();

  // auth 만료된 경우 재발급
  if (decodedAuthorizationToken.isExpired) {
    const response = await userMiddlewareAuthenticationServices.getReissueToken(req);
    const { data, error } = response.body;

    if (!data?.is_reissue || error) return handleRedirectLoginPage();

    const isAutoLogin = req.cookies.get(HEADERS.AUTO_LOGIN)?.value || false;
    setNextCookieAuthToken(response, isAutoLogin, res);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
