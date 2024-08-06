import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  PutUserProfileImagePayload,
  PutUserProfileImageResponse,
  PutUserProfilePayload,
  PutUserProfileResponse
} from '@/apis/services/userProfile/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';
import { getUserId } from '@/apis/utils/getUserId';

const options: ReturnFetchOptions<'userProfileWriter'> = {
  userProfileWriter: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchUserProfileWriter = returnFetchJson(options.userProfileWriter);

const userProfileWriterServices = {
  putUserProfile: async (payload: PutUserProfilePayload) => {
    const response = await fetchUserProfileWriter<ResponseWrapper<PutUserProfileResponse>>('/api/v1/profile', {
      method: METHOD.PUT,
      body: payload
    });
    revalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(getUserId()));
    return response;
  },
  putUserProfileImage: async (payload: PutUserProfileImagePayload) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    const response = await fetchUserProfileWriter<ResponseWrapper<PutUserProfileImageResponse>>('/api/v1/profile/img', {
      method: METHOD.PUT,
      body: formData
    });
    revalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(getUserId()));
    return response;
  }
};

export default userProfileWriterServices;
