import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import kakaoServices from '@/apis/services/kakao/fetch';
import { getKakaoAccessTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePostCodeReturnKakaoToken() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostCodeReturnKakaoToken'],
    mutationFn: (code: string) => kakaoServices.postCodeReturnKakaoToken(code),
    throwOnError: true
  });
}

export function usePostReturnKakaoUserData() {
  const headers = getKakaoAccessTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostReturnKakaoUserData'],
    mutationFn: () => kakaoServices.postReturnKakaoUserData(headers),
    throwOnError: true
  });
}
