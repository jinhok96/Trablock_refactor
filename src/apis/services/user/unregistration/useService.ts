import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import userUnregistrationServices from '@/apis/services/user/unregistration/fetch';

export function usePatchSignOut() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchSignOut'] as const,
    mutationFn: () => userUnregistrationServices.patchSignOut(),
    throwOnError: true
  });
}
