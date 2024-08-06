'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export type CookieOptions = Omit<ResponseCookie, 'name' | 'value'>;

export async function setCookie(name: string, value: string, options?: CookieOptions) {
  cookies().set(name, value, options);
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}
