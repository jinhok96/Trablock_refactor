import { HEADERS } from '@/apis/constants/headers';
import { CookieAuthTokenResponse, OPTIONS } from '@/libs/utils/cookies/core';
import { handleDeleteServerCookie, handleSetServerCookie } from '@/libs/utils/cookies/serverCookies';

export async function setServerCookieAuthToken(res: CookieAuthTokenResponse, isAutoLogin: string | boolean) {
  const authorizationToken = res.headers.get(HEADERS.AUTHORIZATION_TOKEN) || '';
  const refreshToken = res.headers.get(HEADERS.REFRESH_TOKEN) || '';

  if (isAutoLogin) {
    await handleSetServerCookie(HEADERS.AUTO_LOGIN, 'true', OPTIONS);
    await handleSetServerCookie(HEADERS.AUTHORIZATION_TOKEN, authorizationToken, OPTIONS);
    if (refreshToken) await handleSetServerCookie(HEADERS.REFRESH_TOKEN, refreshToken, OPTIONS);
    return;
  }

  await handleDeleteServerCookie(HEADERS.AUTO_LOGIN);
  await handleSetServerCookie(HEADERS.AUTHORIZATION_TOKEN, authorizationToken);
  if (refreshToken) await handleSetServerCookie(HEADERS.REFRESH_TOKEN, refreshToken);
}

export async function deleteServerCookieAuthToken() {
  await handleDeleteServerCookie(HEADERS.AUTO_LOGIN);
  await handleDeleteServerCookie(HEADERS.AUTHORIZATION_TOKEN);
  await handleDeleteServerCookie(HEADERS.REFRESH_TOKEN);
}
