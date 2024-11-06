import { CACHE_TAGS, CACHE_TAGS_PREFIX } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PatchUserProfilePayload,
  PatchUserProfileResponse,
  PutUserProfileImagePayload,
  PutUserProfileImageResponse
} from '@/apis/services/userProfile/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { getUserId } from '@/app/actions/cookieActions';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

const userProfileWriterServices = {
  patchEditUserProfile: async (
    payload: PatchUserProfilePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchUserProfileResponse>>('/api/v1/profile', {
      method: METHOD.PATCH,
      body: payload,
      headers
    });
    const userId = (await getUserId()) || -1;
    handleRevalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(userId));
    handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
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
    const userId = (await getUserId()) || -1;
    handleRevalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(userId));
    handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  },
  patchDeleteUserProfileImage: async (headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PutUserProfileImageResponse>>('/api/v1/profile/img', {
      method: METHOD.PATCH,
      headers
    });
    const userId = (await getUserId()) || -1;
    handleRevalidateTag(CACHE_TAGS.USER_PROFILE.getUserProfile(userId));
    handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  }
};

export default userProfileWriterServices;
