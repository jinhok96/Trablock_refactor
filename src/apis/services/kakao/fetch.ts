import { HEADERS, METHOD } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PostCodeReturnKakaoTokenResponse, PostReturnKakaoUserDataResponse } from '@/apis/services/kakao/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getKakaoAccessTokenHeader } from '@/apis/utils/getHeader';
import { setCookie } from '@/apis/utils/setCookie';

const HEADER_CONTENT_TYPE_URLENCODED = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' };
const GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';

const options: ReturnFetchOptions<'kakaoAuth' | 'kakaoApi'> = {
  kakaoAuth: {
    baseUrl: API_URL.KAKAO_KAUTH_URL,
    headers: {
      ...HEADER_CONTENT_TYPE_URLENCODED
    }
  },
  kakaoApi: {
    baseUrl: API_URL.KAKAO_KAPI_URL,
    headers: {
      ...HEADER_CONTENT_TYPE_URLENCODED,
      ...getKakaoAccessTokenHeader()
    }
  }
};

const fetchKakaoAuth = returnFetchJson(options.kakaoAuth);
const fetchKakaoApi = returnFetchJson(options.kakaoApi);

const kakaoServices = {
  postCodeReturnKakaoToken: async (code: string) => {
    const response = await fetchKakaoAuth<PostCodeReturnKakaoTokenResponse>('/oauth/token', {
      method: METHOD.POST,
      body: new URLSearchParams({
        grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
        client_id: API_URL.KAKAO_CLIENT_ID || '',
        redirect_uri: API_URL.KAKAO_REDIRECT_URL || '',
        code: code
      })
    });
    if (response.ok) {
      const kakaoAccessToken = response.headers.get(HEADERS.KAKAO_ACCESS_TOKEN) || '';
      setCookie(HEADERS.KAKAO_ACCESS_TOKEN, kakaoAccessToken);
    }
    return response.body;
  },
  postReturnKakaoUserData: async () => {
    const response = await fetchKakaoApi<PostReturnKakaoUserDataResponse>('/v2/user/me', {
      next: { revalidate: REVALIDATE_TIME.NONE }
    });
    return response.body;
  }
};

export default kakaoServices;
