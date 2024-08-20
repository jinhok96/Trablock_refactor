import { HEADERS } from '@/apis/constants/headers';
import { getCookie } from '@/apis/utils/getCookie';

export function getAuthorizationTokenHeader() {
  const token = getCookie(HEADERS.AUTHORIZATION_TOKEN) || '';
  return { [HEADERS.AUTHORIZATION_TOKEN]: token } as { 'Authorization-Token': string };
}

export function getRefreshTokenHeader() {
  const token = getCookie(HEADERS.REFRESH_TOKEN);
  return { [HEADERS.REFRESH_TOKEN]: token } as { 'Refresh-Token': string };
}

export function getKakaoAccessTokenHeader() {
  const token = getCookie(HEADERS.KAKAO_ACCESS_TOKEN);
  return { [HEADERS.AUTHORIZATION]: `Bearer ${token}` } as { Authorization: string };
}
