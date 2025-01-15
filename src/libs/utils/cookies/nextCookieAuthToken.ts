import { NextResponse } from 'next/server';

import { HEADERS } from '@/apis/constants/headers';
import { ResponseGenericBody } from '@/apis/httpClient/httpClient';
import { GetReissueTokenResponse, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';
import { OPTIONS, SECURED_OPTIONS } from '@/libs/utils/cookies/core';

export function setNextCookieAuthToken(
  res: ResponseGenericBody<ResponseWrapper<PostLoginResponse | GetReissueTokenResponse>>,
  isAutoLogin: string | boolean,
  nextResponse: NextResponse<unknown>
) {
  const authorizationToken = res.headers.get(HEADERS.AUTHORIZATION_TOKEN) || '';
  const refreshToken = res.headers.get(HEADERS.REFRESH_TOKEN) || '';

  if (isAutoLogin) {
    nextResponse.cookies.set(HEADERS.AUTO_LOGIN, 'true', { ...SECURED_OPTIONS, ...OPTIONS });
    nextResponse.cookies.set(HEADERS.AUTHORIZATION_TOKEN, authorizationToken, { ...SECURED_OPTIONS, ...OPTIONS });
    if (refreshToken) nextResponse.cookies.set(HEADERS.REFRESH_TOKEN, refreshToken, { ...SECURED_OPTIONS, ...OPTIONS });
    return;
  }

  nextResponse.cookies.delete(HEADERS.AUTO_LOGIN);
  nextResponse.cookies.set(HEADERS.AUTHORIZATION_TOKEN, authorizationToken, SECURED_OPTIONS);
  if (refreshToken) nextResponse.cookies.set(HEADERS.REFRESH_TOKEN, refreshToken, SECURED_OPTIONS);
}

// Delete
export function deleteNextCookieAuthToken(nextResponse: NextResponse<unknown>) {
  nextResponse.cookies.delete(HEADERS.AUTO_LOGIN);
  nextResponse.cookies.delete(HEADERS.AUTHORIZATION_TOKEN);
  nextResponse.cookies.delete(HEADERS.REFRESH_TOKEN);
}
