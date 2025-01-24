import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userProfileWriterServices from '@/apis/services/userProfile/writer/fetch';
import { PatchUserProfilePayload, PutUserProfileImagePayload } from '@/apis/services/userProfile/writer/type';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function usePatchEditUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchUserProfile'] as const,
    mutationFn: async (payload: PatchUserProfilePayload) => {
      const headers = await getAuthorizationTokenHeader();
      return userProfileWriterServices.patchEditUserProfile(payload, headers);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] as const });
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.ARTICLE] as const });
    },
    throwOnError: true
  });
}

export function usePutUserProfileImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutUserProfileImage'] as const,
    mutationFn: async (payload: PutUserProfileImagePayload) => {
      const headers = await getAuthorizationTokenHeader();
      return userProfileWriterServices.putUserProfileImage(payload, headers);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] as const });
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.ARTICLE] as const });
    },
    throwOnError: true
  });
}

export function usePatchDeleteUserProfileImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchDeleteUserProfileImage'] as const,
    mutationFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return userProfileWriterServices.patchDeleteUserProfileImage(headers);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] as const });
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.ARTICLE] as const });
    },
    throwOnError: true
  });
}
