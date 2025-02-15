import { NextRequest, NextResponse } from 'next/server';

import kakaoServices from '@/apis/services/kakao/fetch';
import oAuthServices from '@/apis/services/oAuth/fetch';
import { PostOAuthPayload } from '@/apis/services/oAuth/type';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { setNextCookieAuthToken } from '@/libs/utils/cookies/nextCookieAuthToken';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const nextPath = searchParams.get(APP_QUERIES.NEXT) || APP_URLS.HOME;
  const nextParam = nextPath ? `?${APP_QUERIES.NEXT}=${nextPath}` : '';

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const redirectUrl = state ? decodeURIComponent(state) : APP_URLS.HOME;
  const successRedirectUrl = new URL(redirectUrl, req.url);
  const failRedirectUrl = new URL(APP_URLS.LOGIN + nextParam, req.url);

  const res = NextResponse.redirect(successRedirectUrl);

  if (!code) return NextResponse.redirect(failRedirectUrl);

  try {
    // 카카오 OAuth 토큰 획득
    const tokenResponse = await kakaoServices.postKakaoOauthToken(code);
    const accessToken = tokenResponse.body?.data?.body.access_token;

    if (!accessToken) return NextResponse.redirect(failRedirectUrl);

    // 카카오 사용자 데이터 획득
    const userDataRes = await kakaoServices.postKakaoUserData(accessToken);
    const { kakao_account } = userDataRes.body;
    const payload: PostOAuthPayload = {
      profile_nickname: kakao_account?.profile?.nickname || '',
      profile_img_url: kakao_account?.profile?.profile_image_url || '',
      account_email: kakao_account?.email || '',
      is_agreement: true
    };

    // 백엔드 oauth api
    const oauthRes = await oAuthServices.postOAuth(payload);
    const { data, error } = oauthRes.body;

    if (!data || error) return NextResponse.redirect(failRedirectUrl);

    setNextCookieAuthToken(oauthRes, false, res);

    // 로그인 성공 후 홈페이지로 리다이렉트
    return res;
  } catch (error) {
    console.log('error', error);
    return NextResponse.redirect(failRedirectUrl);
  }
}
