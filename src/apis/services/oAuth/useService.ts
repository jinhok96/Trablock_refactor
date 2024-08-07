import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import oAuthServices from '@/apis/services/oAuth/fetch';
import { PostOAuthPayload } from '@/apis/services/oAuth/type';

export function usePostOAuth() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostOAuth'] as const,
    mutationFn: (payload: PostOAuthPayload) => oAuthServices.postOAuth(payload),
    throwOnError: true
  });
}
