import { HEADERS } from '@/apis/constants/headers';

// 서버 사이드에서만 next/headers를 import
function getServerCookie(name: string) {
  if (typeof window === 'undefined') {
    const { cookies } = require('next/headers');
    return cookies().get(name)?.value || '';
  }
  return '';
}

// 클라이언트 사이드에서만 js-cookie를 import
function getClientCookie(name: string) {
  if (typeof window !== 'undefined') {
    const Cookies = require('js-cookie');
    return Cookies.get(name) || '';
  }
  return '';
}

export function getCookie(name: string) {
  if (typeof window === 'undefined') {
    return getServerCookie(name);
  }
  return getClientCookie(name);
}

export function getAuthTokenHeader() {
  const token = getCookie(HEADERS.AUTHORIZATION_TOKEN);
  return { [HEADERS.AUTHORIZATION_TOKEN]: token };
}

export function getRefreshTokenHeader() {
  const token = getCookie(HEADERS.REFRESH_TOKEN);
  return { [HEADERS.REFRESH_TOKEN]: token };
}

export function getKakaoAccessTokenHeader() {
  const token = getCookie(HEADERS.KAKAO_ACCESS_TOKEN);
  return { [HEADERS.AUTHORIZATION]: `Bearer ${token}` };
}
