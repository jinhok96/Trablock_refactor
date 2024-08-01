import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'userProfileReader'> = {
  userProfileReader: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchUserProfileReader = returnFetchJson(options.userProfileReader);

const userProfileReaderServices = {
  getUserProfile: async (userId: number) => {
    const response = await fetchUserProfileReader<GetUserProfileResponse>(`/api/v1/profile/${userId}`, {
      next: {
        tags: [CACHE_TAGS.USER_PROFILE.getUserProfile(userId)] as const,
        revalidate: REVALIDATE_TIME.MIN_05
      }
    });
    return response.body;
  }
};

export default userProfileReaderServices;
