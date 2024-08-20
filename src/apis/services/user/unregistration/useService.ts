import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import userUnregistrationServices from '@/apis/services/user/unregistration/fetch';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePatchSignOut() {
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchSignOut'] as const,
    mutationFn: () => userUnregistrationServices.patchSignOut(headers),
    throwOnError: true
  });
}
