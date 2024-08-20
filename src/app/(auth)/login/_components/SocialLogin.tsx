'use client';

import Button from '@/components/common/buttons/Button';
import KakaoSvg from '@/icons/kakao.svg';
import useToast from '@/libs/hooks/useToast';

export default function SocialLogin() {
  const { showToast: openToast, closeToast } = useToast();
  let i = 0;
  const handleNotify = () => {
    openToast(<p className="text-red-01">테스트 토스트입니다. {i}</p>);
    i += 1;
  };

  return (
    <div className="flex-row-center justify-center">
      <KakaoSvg className="size-12" />
      <Button onClick={handleNotify}>토스트</Button>
      <Button onClick={closeToast}>닫기</Button>
    </div>
  );
}
