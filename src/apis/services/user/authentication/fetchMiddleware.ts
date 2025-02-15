import { NextRequest } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import { GetReissueTokenResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';

const userMiddlewareAuthenticationServices = {
  getReissueToken: async (req: NextRequest) => {
    const response = await httpClientDefault.get<ResponseWrapper<GetReissueTokenResponse>>(
      '/api/v1/auth/reissue-token',
      {
        next: { revalidate: REVALIDATE_TIME.NONE },
        headers: {
          [HEADERS.AUTHORIZATION_TOKEN]: req.cookies.get(HEADERS.AUTHORIZATION_TOKEN)?.value || '',
          [HEADERS.REFRESH_TOKEN]: req.cookies.get(HEADERS.REFRESH_TOKEN)?.value || ''
        }
      }
    );
    return response;
  }
};

export default userMiddlewareAuthenticationServices;
