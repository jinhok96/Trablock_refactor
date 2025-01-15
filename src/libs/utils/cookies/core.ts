import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { ResponseGenericBody } from '@/apis/httpClient/httpClient';
import { GetReissueTokenResponse, PostLoginResponse } from '@/apis/services/user/authentication/type';
import { ResponseWrapper } from '@/apis/types/common';

export type CookieOptions = Omit<ResponseCookie, 'name' | 'value'>;
export type CookieAuthTokenResponse = ResponseGenericBody<ResponseWrapper<PostLoginResponse | GetReissueTokenResponse>>;

// 자동 로그인(isAutoLogin)일 경우 = 14일 보관
// 자동 로그인(isAutoLogin) 아닐 경우 = 세션

const maxAge = 14 * 24 * 60 * 60;
const expires = new Date(Date.now() + maxAge * 1000);
export const OPTIONS: CookieOptions = { maxAge, expires };
export const SECURED_OPTIONS: Partial<ResponseCookie> = {
  secure: true,
  httpOnly: true,
  sameSite: 'strict'
};
