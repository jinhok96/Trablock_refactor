import { API_URLS } from '@/apis/constants/apiUrls';
import { METHOD } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PostCodeReturnKakaoTokenResponse, PostReturnKakaoUserDataResponse } from '@/apis/services/kakao/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens, ReturnFetchOptions } from '@/apis/types/options';

const HEADER_CONTENT_TYPE_URLENCODED = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' };
const GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';

const options: ReturnFetchOptions<'kakaoAuth' | 'kakaoApi'> = {
  kakaoAuth: {
    baseUrl: API_URLS.KAKAO_KAUTH_URL,
    headers: {
      ...HEADER_CONTENT_TYPE_URLENCODED
    }
  },
  kakaoApi: {
    baseUrl: API_URLS.KAKAO_KAPI_URL,
    headers: {
      ...HEADER_CONTENT_TYPE_URLENCODED
    }
  }
};

const fetchKakaoAuth = returnFetchJson(options.kakaoAuth);
const fetchKakaoApi = returnFetchJson(options.kakaoApi);

const kakaoServices = {
  postCodeReturnKakaoToken: async (code: string) => {
    const response = await fetchKakaoAuth<ResponseWrapper<PostCodeReturnKakaoTokenResponse>>('/oauth/token', {
      method: METHOD.POST,
      body: new URLSearchParams({
        grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
        client_id: API_URLS.KAKAO_CLIENT_ID || '',
        redirect_uri: API_URLS.KAKAO_REDIRECT_URL || '',
        code: code
      })
    });
    return response;
  },
  postReturnKakaoUserData: async (headers: Pick<HeaderTokens, 'Authorization'>) => {
    const response = await fetchKakaoApi<ResponseWrapper<PostReturnKakaoUserDataResponse>>('/v2/user/me', {
      next: { revalidate: REVALIDATE_TIME.NONE },
      headers
    });
    return response;
  }
};

export default kakaoServices;
