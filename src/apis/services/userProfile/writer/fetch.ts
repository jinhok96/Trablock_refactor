import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PutUserProfileImagePayload,
  PutUserProfileImageResponse,
  PutUserProfilePayload,
  PutUserProfileResponse
} from '@/apis/services/userProfile/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { getUserId } from '@/apis/utils/getUserId';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

const userProfileWriterServices = {
  putUserProfile: async (payload: PutUserProfilePayload, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PutUserProfileResponse>>('/api/v1/profile', {
      method: METHOD.PUT,
      body: payload,
      headers
    });
    handleRevalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(getUserId()));
    return response;
  },
  putUserProfileImage: async (
    payload: PutUserProfileImagePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    const response = await fetchJsonDefault<ResponseWrapper<PutUserProfileImageResponse>>('/api/v1/profile/img', {
      method: METHOD.PUT,
      body: formData,
      headers
    });
    handleRevalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(getUserId()));
    return response;
  }
};

export default userProfileWriterServices;
