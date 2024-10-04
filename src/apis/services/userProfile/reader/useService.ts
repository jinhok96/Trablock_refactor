import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function useGetUserProfile(userId: number, isMyProfile?: boolean) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE, 'useGetUserProfile', userId] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return userProfileReaderServices.getUserProfile(userId, headers, isMyProfile);
    }
  });
}
