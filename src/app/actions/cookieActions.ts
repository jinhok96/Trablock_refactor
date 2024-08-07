'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export type CookieOptions = Omit<ResponseCookie, 'name' | 'value'>;

async function setCookie(name: string, value: string, options?: CookieOptions) {
  console.log('Set Cookie', name, value);
  cookies().set(name, value, options);
}

async function getCookie(name: string) {
  return cookies().get(name)?.value;
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
