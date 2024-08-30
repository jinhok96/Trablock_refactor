import { NextRequest } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { GetReissueTokenResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { throwError } from '@/apis/utils/throwError';

const userMiddlewareAuthenticationServices = {
  getReissueToken: async (req: NextRequest) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetReissueTokenResponse>>('/api/v1/auth/reissue-token', {
      next: { revalidate: REVALIDATE_TIME.NONE },
      headers: {
        [HEADERS.AUTHORIZATION_TOKEN]: req.cookies.get(HEADERS.AUTHORIZATION_TOKEN)?.value || '',
        [HEADERS.REFRESH_TOKEN]: req.cookies.get(HEADERS.REFRESH_TOKEN)?.value || ''
      }
    });
    throwError(response.body.error);
    return response;
  }
};

export default userMiddlewareAuthenticationServices;
