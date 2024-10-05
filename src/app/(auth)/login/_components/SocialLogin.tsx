'use client';

import Button from '@/components/common/buttons/Button';
import KakaoSvg from '@/icons/kakao.svg';
import { ENV } from '@/libs/constants/env';

export default function SocialLogin() {
  const kakaoRedirectURI = ENV.PROD !== ENV.KEY_PROD ? ENV.KAKAO_REDIRECT_URI_DEV : ENV.KAKAO_REDIRECT_URI;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${ENV.KAKAO_REST_API_KEY}&redirect_uri=${kakaoRedirectURI}`;

  const handleClick = () => {
    window.location.href = kakaoLoginUrl;
  };

  return (
    <div className="flex-row-center justify-center">
      <Button onClick={handleClick}>
        <KakaoSvg className="size-12" />
      </Button>
    </div>
  );
}
