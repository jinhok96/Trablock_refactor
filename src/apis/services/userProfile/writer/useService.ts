import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userProfileWriterServices from '@/apis/services/userProfile/writer/fetch';
import { PutUserProfilePayload } from '@/apis/services/userProfile/writer/type';

export function usePutUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutUserProfile'] as const,
    mutationFn: (payload: PutUserProfilePayload) => userProfileWriterServices.putUserProfile(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] as const }),
    throwOnError: true
  });
}
