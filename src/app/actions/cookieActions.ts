'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

import { HEADERS } from '@/apis/constants/headers';

export type CookieOptions = Omit<ResponseCookie, 'name' | 'value'>;

async function setCookie(name: string, value: string, options?: CookieOptions) {
  const securedOptions: CookieOptions = {
    ...options,
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  };
  cookies().set(name, value, securedOptions);
}

async function getCookie(name: string) {
  return cookies().get(name)?.value || '';
}

async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function handleSetCookie(name: string, value: string, options?: CookieOptions) {
  await setCookie(name, value, options);
}

export async function handleGetCookie(name: string) {
  return await getCookie(name);
}

export async function handleDeleteCookie(name: string) {
  await deleteCookie(name);
}

// getTokenHeader
export async function getAuthorizationTokenHeader() {
  const token = await getCookie(HEADERS.AUTHORIZATION_TOKEN);
  return { [HEADERS.AUTHORIZATION_TOKEN]: token } as { 'Authorization-Token': string };
}

export async function getRefreshTokenHeader() {
  const token = await getCookie(HEADERS.REFRESH_TOKEN);
  return { [HEADERS.REFRESH_TOKEN]: token } as { 'Refresh-Token': string };
}

export async function getKakaoAccessTokenHeader() {
  const token = await getCookie(HEADERS.KAKAO_ACCESS_TOKEN);
  return { [HEADERS.AUTHORIZATION]: `Bearer ${token}` } as { Authorization: string };
}
