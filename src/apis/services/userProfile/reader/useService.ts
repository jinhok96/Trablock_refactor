import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';

export function useGetUserProfile(userId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE, 'useGetUserProfile', userId] as const,
    queryFn: () => userProfileReaderServices.getUserProfile(userId)
  });
}
