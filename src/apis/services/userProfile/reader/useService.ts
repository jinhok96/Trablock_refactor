import { useMutation, useQuery } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function useGetUserProfile(userId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE, 'useGetUserProfile', userId] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return userProfileReaderServices.getUserProfile(userId, headers);
    }
  });
}

export function useGetUserProfileMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'useGetUserProfile'] as const,
    mutationFn: async (userId: number) => {
      const headers = await getAuthorizationTokenHeader();
      return userProfileReaderServices.getUserProfile(userId, headers);
    }
  });
}
