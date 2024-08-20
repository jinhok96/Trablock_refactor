import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function useGetUserProfile(userId: number, isMyProfile?: boolean) {
  const headers = getAuthorizationTokenHeader();
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE, 'useGetUserProfile', userId] as const,
    queryFn: () => userProfileReaderServices.getUserProfile(userId, headers, isMyProfile)
  });
}
