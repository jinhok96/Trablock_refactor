import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import { GetReissueTokenResponse, PostLoginPayload, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const userAuthenticationServices = {
  postLogin: async (payload: PostLoginPayload) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostLoginResponse>>('/api/v1/auth/login', {
      body: payload
    });
    return response;
  },
  getReissueToken: async (headers: Pick<HeaderTokens, 'Authorization-Token' | 'Refresh-Token'>) => {
    const response = await httpClientDefault.get<ResponseWrapper<GetReissueTokenResponse>>(
      '/api/v1/auth/reissue-token',
      {
        next: { revalidate: REVALIDATE_TIME.NONE },
        headers
      }
    );
    return response;
  }
};

export default userAuthenticationServices;
