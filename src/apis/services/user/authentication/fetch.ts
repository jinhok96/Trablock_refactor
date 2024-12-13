import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { httpClientJsonDefault } from '@/apis/httpClient/httpClientJsonDefault';
import { GetReissueTokenResponse, PostLoginPayload, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const userAuthenticationServices = {
  postLogin: async (payload: PostLoginPayload) => {
    const response = await httpClientJsonDefault.post<ResponseWrapper<PostLoginResponse>>('/api/v1/auth/login', {
      body: payload
    });
    return response;
  },
  getReissueToken: async (headers: Pick<HeaderTokens, 'Authorization-Token' | 'Refresh-Token'>) => {
    const response = await httpClientJsonDefault.get<ResponseWrapper<GetReissueTokenResponse>>(
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
