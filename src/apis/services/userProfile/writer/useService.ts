import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userProfileWriterServices from '@/apis/services/userProfile/writer/fetch';
import { PutUserProfileImagePayload, PutUserProfilePayload } from '@/apis/services/userProfile/writer/type';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePutUserProfile() {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutUserProfile'] as const,
    mutationFn: (payload: PutUserProfilePayload) => userProfileWriterServices.putUserProfile(payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] as const }),
    throwOnError: true
  });
}

export function usePutUserProfileImage() {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutUserProfileImage'] as const,
    mutationFn: (payload: PutUserProfileImagePayload) =>
      userProfileWriterServices.putUserProfileImage(payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] as const }),
    throwOnError: true
  });
}
