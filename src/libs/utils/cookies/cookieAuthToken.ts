import { HEADERS } from '@/apis/constants/headers';
import { handleDeleteCookie, handleSetCookie } from '@/app/actions/cookieActions';
import { CookieAuthTokenResponse, OPTIONS } from '@/libs/utils/cookies/core';

export async function setCookieAuthToken(res: CookieAuthTokenResponse, isAutoLogin: string | boolean) {
  const authorizationToken = res.headers.get(HEADERS.AUTHORIZATION_TOKEN) || '';
  const refreshToken = res.headers.get(HEADERS.REFRESH_TOKEN) || '';

  if (isAutoLogin) {
    await handleSetCookie(HEADERS.AUTO_LOGIN, 'true', OPTIONS);
    await handleSetCookie(HEADERS.AUTHORIZATION_TOKEN, authorizationToken, OPTIONS);
    if (refreshToken) await handleSetCookie(HEADERS.REFRESH_TOKEN, refreshToken, OPTIONS);
    return;
  }

  await handleDeleteCookie(HEADERS.AUTO_LOGIN);
  await handleSetCookie(HEADERS.AUTHORIZATION_TOKEN, authorizationToken);
  if (refreshToken) await handleSetCookie(HEADERS.REFRESH_TOKEN, refreshToken);
}

export async function deleteCookieAuthToken() {
  await handleDeleteCookie(HEADERS.AUTO_LOGIN);
  await handleDeleteCookie(HEADERS.AUTHORIZATION_TOKEN);
  await handleDeleteCookie(HEADERS.REFRESH_TOKEN);
}
