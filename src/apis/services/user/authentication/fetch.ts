import { METHOD } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { GetReissueTokenResponse, PostLoginPayload, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const userAuthenticationServices = {
  postLogin: async (payload: PostLoginPayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostLoginResponse>>('/api/v1/auth/login', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  },
  getReissueToken: async (headers: Pick<HeaderTokens, 'Authorization-Token' | 'Refresh-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetReissueTokenResponse>>('/api/v1/auth/reissue-token', {
      next: { revalidate: REVALIDATE_TIME.NONE },
      headers
    });
    return response;
  }
};

export default userAuthenticationServices;
