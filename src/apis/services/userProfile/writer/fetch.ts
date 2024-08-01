import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PutUserProfilePayload, PutUserProfileResponse } from '@/apis/services/userProfile/writer/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getUserId } from '@/apis/utils/getCookie';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

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
    const formData = new FormData();
    formData.append('file', payload.file);
    const profileBlob = new Blob([JSON.stringify(payload.profile)], { type: 'application/json' });
    formData.append('profile', profileBlob);
    const response = await fetchUserProfileWriter<PutUserProfileResponse>('/api/v1/profile', {
      method: METHOD.PUT,
      body: formData
    });
    revalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(getUserId()));
    return response.body;
  }
};

export default userProfileWriterServices;
