import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

import { HEADERS } from '@/apis/constants/headers';
import { jwtDecode } from '@/libs/utils/jwtDecode';

export type CookieOptions = Omit<ResponseCookie, 'name' | 'value'>;

async function setServerCookie(name: string, value: string, options?: CookieOptions) {
  const securedOptions: CookieOptions = {
    ...options,
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  };
  cookies().set(name, value, securedOptions);
}

async function getServerCookie(name: string) {
  return cookies().get(name)?.value || '';
}

async function deleteServerCookie(name: string) {
  cookies().delete(name);
}

export async function handleSetServerCookie(name: string, value: string, options?: CookieOptions) {
  await setServerCookie(name, value, options);
}

export async function handleGetServerCookie(name: string) {
  return await getServerCookie(name);
}

export async function handleDeleteServerCookie(name: string) {
  await deleteServerCookie(name);
}

// getTokenHeader
export async function getServerAuthorizationTokenHeader() {
  const token = await getServerCookie(HEADERS.AUTHORIZATION_TOKEN);
  return { [HEADERS.AUTHORIZATION_TOKEN]: token } as { 'Authorization-Token': string };
}

export async function getServerRefreshTokenHeader() {
  const token = await getServerCookie(HEADERS.REFRESH_TOKEN);
  return { [HEADERS.REFRESH_TOKEN]: token } as { 'Refresh-Token': string };
}

// getUserId
export async function getServerUserId(): Promise<number | null> {
  const authTokenHeader = await getServerAuthorizationTokenHeader();
  const decodedToken = jwtDecode<{ userId?: number }>(authTokenHeader['Authorization-Token']);

  if (!decodedToken.isValid) return null;

  const userId = decodedToken?.userId || null;
  return userId;
}
