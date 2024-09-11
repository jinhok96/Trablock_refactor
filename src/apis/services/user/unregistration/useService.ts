import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import userUnregistrationServices from '@/apis/services/user/unregistration/fetch';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function usePatchSignOut() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchSignOut'] as const,
    mutationFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return userUnregistrationServices.patchSignOut(headers);
    },
    throwOnError: true
  });
}
