import { jwtDecode } from 'jwt-decode';

import { HEADERS } from '@/apis/constants/headers';

// 서버 사이드에서만 next/headers를 import
const getServerCookie = (id: string) => {
  if (typeof window === 'undefined') {
    const { cookies } = require('next/headers');
    return cookies().get(id)?.value || '';
  }
  return '';
};

// 클라이언트 사이드에서만 js-cookie를 import
const getClientCookie = (id: string) => {
  if (typeof window !== 'undefined') {
    const cookies = require('js-cookie');
    return cookies.get(id) || '';
  }
  return '';
};

// 환경에 따라 적절한 함수 호출
export const getAuthToken = (): string => {
  return typeof window === 'undefined'
    ? getServerCookie(HEADERS.AUTHORIZATION_TOKEN)
    : getClientCookie(HEADERS.AUTHORIZATION_TOKEN);
};

export const getRefreshToken = (): string => {
  return typeof window === 'undefined'
    ? getServerCookie(HEADERS.REFRESH_TOKEN)
    : getClientCookie(HEADERS.REFRESH_TOKEN);
};

export const getUserId = (): number => {
  const token = getAuthToken();
  const decoded: { userId: number } = jwtDecode(token);
  const { userId } = decoded;
  return userId;
};

export const getKakaoAccessToken = (): string => {
  return typeof window === 'undefined'
    ? getServerCookie(HEADERS.KAKAO_ACCESS_TOKEN)
    : getClientCookie(HEADERS.KAKAO_ACCESS_TOKEN);
};
