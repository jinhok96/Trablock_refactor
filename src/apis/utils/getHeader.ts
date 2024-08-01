import { HEADERS } from '@/apis/constants/headers';
import { getAuthToken, getKakaoAccessToken, getRefreshToken } from '@/apis/utils/getCookie';

export const getAuthTokenHeader = () => ({
  [HEADERS.AUTHORIZATION_TOKEN]: getAuthToken()
});

export const getRefreshTokenHeader = () => ({
  [HEADERS.REFRESH_TOKEN]: getRefreshToken()
});

export const getKakaoAccessTokenHeader = () => ({
  [HEADERS.AUTHORIZATION]: `Bearer ${getKakaoAccessToken()}`
});
