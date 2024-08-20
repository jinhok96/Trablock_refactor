import { NextRequest } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { GetReissueTokenResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';

const options: ReturnFetchOptions<'userMiddlewareAuthentication'> = {
  userMiddlewareAuthentication: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchUserMiddlewareAuthentication = returnFetchJson(options.userMiddlewareAuthentication);

const userMiddlewareAuthenticationServices = {
  getReissueToken: async (req: NextRequest) => {
    const response = await fetchUserMiddlewareAuthentication<ResponseWrapper<GetReissueTokenResponse>>(
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
