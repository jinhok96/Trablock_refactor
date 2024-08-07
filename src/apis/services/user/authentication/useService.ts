import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userAuthenticationServices from '@/apis/services/user/authentication/fetch';
import { PostLoginPayload } from '@/apis/services/user/authentication/type';

export function usePostLogin() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostLogin'] as const,
    mutationFn: (payload: PostLoginPayload) => userAuthenticationServices.postLogin(payload),
    throwOnError: true
  });
}

export function useGetReissueToken() {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.USER_AUTHENTICATION, 'useGetReissueToken'] as const,
    queryFn: () => userAuthenticationServices.getReissueToken()
  });
}
