import { METHOD } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { GetReissueTokenResponse, PostLoginPayload, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader, getRefreshTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'userAuthentication' | 'userReissueToken'> = {
  userAuthentication: {
    baseUrl: API_URL.API_BASE_URL
  },
  userReissueToken: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader(),
      ...getRefreshTokenHeader()
    }
  }
};

const fetchUserAuthentication = returnFetchJson(options.userAuthentication);
const fetchUserReissueToken = returnFetchJson(options.userReissueToken);

const userAuthenticationServices = {
  postLogin: async (payload: PostLoginPayload) => {
    const response = await fetchUserAuthentication<ResponseWrapper<PostLoginResponse>>('/api/v1/auth/login', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  },
  getReissueToken: async () => {
    const response = await fetchUserReissueToken<ResponseWrapper<GetReissueTokenResponse>>(
      '/api/v1/auth/reissue-token',
      {
        next: { revalidate: REVALIDATE_TIME.NONE }
      }
    );
    return response;
  }
};

export default userAuthenticationServices;
