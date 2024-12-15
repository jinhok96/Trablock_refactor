import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const userProfileReaderServices = {
  getUserProfile: async (userId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await httpClientDefault.get<ResponseWrapper<GetUserProfileResponse>>(`/api/v1/profile/${userId}`, {
      next: {
        tags: CACHE_TAGS.USER_PROFILE.getUserProfile(userId),
        revalidate: REVALIDATE_TIME.MIN_05
      },
      headers
    });
    return response;
  }
};

export default userProfileReaderServices;
