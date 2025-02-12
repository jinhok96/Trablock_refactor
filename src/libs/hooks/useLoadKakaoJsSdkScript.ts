import { useEffect, useState } from 'react';

import { ENV } from '@/libs/constants/env';

export default function useLoadKakaoJsSdkScript() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!window?.Kakao) return;
    if (!ENV.KAKAO_JAVASCRIPT_KEY) return;

    if (!window?.Kakao.Auth) window.Kakao.init(ENV.KAKAO_JAVASCRIPT_KEY);
    const isInitialized = window?.Kakao?.isInitialized();

    setIsLoaded(isInitialized);
  }, [window?.Kakao]);

  return { isLoaded };
}
