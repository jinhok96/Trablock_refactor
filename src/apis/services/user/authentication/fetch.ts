import { METHOD } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { GetReissueTokenResponse, PostLoginPayload, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { throwError } from '@/apis/utils/throwError';

const userAuthenticationServices = {
  postLogin: async (payload: PostLoginPayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostLoginResponse>>('/api/v1/auth/login', {
      method: METHOD.POST,
      body: payload
    });
    throwError(response.body.error);
    return response;
  },
  getReissueToken: async (headers: Pick<HeaderTokens, 'Authorization-Token' | 'Refresh-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetReissueTokenResponse>>('/api/v1/auth/reissue-token', {
      next: { revalidate: REVALIDATE_TIME.NONE },
      headers
    });
    throwError(response.body.error);
    return response;
  }
};

export default userAuthenticationServices;
