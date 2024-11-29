import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import registrationServices from '@/apis/services/user/registration/fetch';
import { PostJoinPayload } from '@/apis/services/user/registration/type';

export function usePostJoin() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostJoin'] as const,
    mutationFn: (payload: PostJoinPayload) => registrationServices.postJoin(payload),
    throwOnError: true
  });
}
