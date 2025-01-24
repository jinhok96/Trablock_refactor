import { CACHE_TAGS_PREFIX } from '@/apis/constants/cacheTags';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import compressImageServices from '@/apis/services/compressImage/fetch';
import {
  PatchUserProfilePayload,
  PatchUserProfileResponse,
  PutUserProfileImagePayload,
  PutUserProfileImageResponse
} from '@/apis/services/userProfile/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

const userProfileWriterServices = {
  patchEditUserProfile: async (
    payload: PatchUserProfilePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await httpClientDefault.patch<ResponseWrapper<PatchUserProfileResponse>>('/api/v1/profile', {
      body: payload,
      headers
    });
    await handleRevalidateTag(CACHE_TAGS_PREFIX.USER_PROFILE);
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  },
  putUserProfileImage: async (
    payload: PutUserProfileImagePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const compressedFile = await compressImageServices.postImage(payload.file);
    const formData = new FormData();
    formData.append('file', compressedFile);

    const response = await httpClientDefault.put<ResponseWrapper<PutUserProfileImageResponse>>('/api/v1/profile/img', {
      body: formData,
      headers
    });
    await handleRevalidateTag(CACHE_TAGS_PREFIX.USER_PROFILE);
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  },
  patchDeleteUserProfileImage: async (headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await httpClientDefault.patch<ResponseWrapper<PutUserProfileImageResponse>>(
      '/api/v1/profile/img',
      { headers }
    );
    await handleRevalidateTag(CACHE_TAGS_PREFIX.USER_PROFILE);
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  }
};

export default userProfileWriterServices;
