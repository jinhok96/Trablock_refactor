import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const userProfileReaderServices = {
  getUserProfile: async (userId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>, isMyProfile?: boolean) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetUserProfileResponse>>(`/api/v1/profile/${userId}`, {
      next: {
        revalidate: !isMyProfile && REVALIDATE_TIME.NONE
      },
      headers
    });
    return response;
  }
};

export default userProfileReaderServices;
