import { useEffect, useState } from 'react';

import { ENV } from '@/libs/constants/env';

export default function useLoadKakaoJsSdkScript() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!window?.Kakao) return;
    if (!ENV.KAKAO_JAVASCRIPT_KEY) return;

    const isInitialized = window?.Kakao?.isInitialized();
    if (!isInitialized) window.Kakao.init(ENV.KAKAO_JAVASCRIPT_KEY);

    setIsLoaded(isInitialized);
  }, [typeof window?.Kakao]);

  return { isLoaded };
}
