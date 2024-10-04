import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import { ResponseGenericBody } from '@/apis/returnFetchJson/returnFetchJson';
import { GetReissueTokenResponse, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { CookieOptions, handleDeleteCookie, handleSetCookie } from '@/app/actions/cookieActions';

const maxAge = 14 * 24 * 60 * 60;
const expires = new Date(Date.now() + maxAge * 1000);
const OPTIONS: CookieOptions = { maxAge, expires };
const SECURED_OPTIONS: Partial<ResponseCookie> = {
  secure: true,
  httpOnly: true,
  sameSite: 'strict',
  maxAge,
  expires
};

// 자동 로그인(isAutoLogin)일 경우 = 14일 보관
// 자동 로그인(isAutoLogin) 아닐 경우 = 세션

// authorizationToken, refreshToken 쿠키에 저장
export async function setCookieAuthToken(
  res: ResponseGenericBody<ResponseWrapper<PostLoginResponse | GetReissueTokenResponse>>,
  isAutoLogin: string | boolean,
  middlewareRes?: NextResponse<unknown>
) {
  const authorizationToken = res.headers.get(HEADERS.AUTHORIZATION_TOKEN) || '';
  const refreshToken = res.headers.get(HEADERS.REFRESH_TOKEN) || '';

  if (middlewareRes) {
    if (isAutoLogin) {
      middlewareRes.cookies.set(HEADERS.AUTO_LOGIN, 'true', SECURED_OPTIONS);
      middlewareRes.cookies.set(HEADERS.AUTHORIZATION_TOKEN, authorizationToken, SECURED_OPTIONS);
      if (!refreshToken) return;
      return middlewareRes.cookies.set(HEADERS.REFRESH_TOKEN, refreshToken, SECURED_OPTIONS);
    }
    middlewareRes.cookies.delete(HEADERS.AUTO_LOGIN);
    middlewareRes.cookies.set(HEADERS.AUTHORIZATION_TOKEN, authorizationToken);
    if (!refreshToken) return;
    return middlewareRes.cookies.set(HEADERS.REFRESH_TOKEN, refreshToken);
  }

  if (isAutoLogin) {
    await handleSetCookie(HEADERS.AUTO_LOGIN, 'true', SECURED_OPTIONS);
    await handleSetCookie(HEADERS.AUTHORIZATION_TOKEN, authorizationToken, OPTIONS);
    if (!refreshToken) return;
    return await handleSetCookie(HEADERS.REFRESH_TOKEN, refreshToken, OPTIONS);
  }
  await handleDeleteCookie(HEADERS.AUTO_LOGIN);
  await handleSetCookie(HEADERS.AUTHORIZATION_TOKEN, authorizationToken);
  if (!refreshToken) return;
  return await handleSetCookie(HEADERS.REFRESH_TOKEN, refreshToken);
}

export async function deleteCookieAuthToken() {
  await handleDeleteCookie(HEADERS.AUTO_LOGIN);
  await handleDeleteCookie(HEADERS.AUTHORIZATION_TOKEN);
  await handleDeleteCookie(HEADERS.REFRESH_TOKEN);
}
