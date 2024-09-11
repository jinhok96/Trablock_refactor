import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import kakaoServices from '@/apis/services/kakao/fetch';
import { getKakaoAccessTokenHeader } from '@/app/actions/cookieActions';

export function usePostCodeReturnKakaoToken() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostCodeReturnKakaoToken'],
    mutationFn: (code: string) => kakaoServices.postCodeReturnKakaoToken(code),
    throwOnError: true
  });
}

export function usePostReturnKakaoUserData() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostReturnKakaoUserData'],
    mutationFn: async () => {
      const headers = await getKakaoAccessTokenHeader();
      return kakaoServices.postReturnKakaoUserData(headers);
    },
    throwOnError: true
  });
}
