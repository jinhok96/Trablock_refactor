import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type JsCookieOptions = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  [property: string]: any;
};

type NextCookieOptions = Omit<ResponseCookie, 'name' | 'value'>;

// 서버 사이드에서만 next/headers를 import
const setServerCookie = (name: string, value: string, options?: NextCookieOptions) => {
  if (typeof window === 'undefined') {
    const { cookies } = require('next/headers');
    cookies().set({ name, value, ...options });
  }
};

// 클라이언트 사이드에서만 js-cookie를 import
const setClientCookie = (name: string, value: string, options?: JsCookieOptions) => {
  if (typeof window !== 'undefined') {
    const cookies = require('js-cookie');
    cookies.set(name, value, options);
  }
};

// 환경에 따라 적절한 함수 호출
export const setCookie = (name: string, value: string, options?: NextCookieOptions | JsCookieOptions) => {
  return typeof window === 'undefined'
    ? setServerCookie(name, value, options as NextCookieOptions)
    : setClientCookie(name, value, options as JsCookieOptions);
};
