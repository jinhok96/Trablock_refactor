'use client';

import Button from '@/components/common/buttons/Button';
import KakaoSvg from '@/icons/kakao.svg';
import { ENV } from '@/libs/constants/env';

const KAKAO_REDIRECT_URI = ENV.PROD !== ENV.KEY_PROD ? ENV.KAKAO_REDIRECT_URI_DEV : ENV.KAKAO_REDIRECT_URI;
const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${ENV.KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

export default function SocialLogin() {
  const handleClick = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <div className="flex-row-center justify-center">
      <Button onClick={handleClick}>
        <KakaoSvg className="size-12" />
      </Button>
    </div>
  );
}
