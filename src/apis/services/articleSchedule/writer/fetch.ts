import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PatchDeleteScheduleListResponse,
  PutScheduleListPayload,
  PutScheduleListResponse
} from '@/apis/services/articleSchedule/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

const articleScheduleWriterServices = {
  putScheduleList: async (
    articleId: number,
    payload: PutScheduleListPayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await fetchJsonDefault<ResponseWrapper<PutScheduleListResponse>>(
      `/api/v1/articles/${articleId}/schedules`,
      {
        method: METHOD.PUT,
        body: payload,
        headers
      }
    );
    handleRevalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getScheduleList(articleId));
    handleRevalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getSchedulePlaceList(articleId));
    return response;
  },
  patchDeleteScheduleList: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchDeleteScheduleListResponse>>(
      `/api/v1/articles/${articleId}/status`,
      {
        method: METHOD.PATCH,
        headers
      }
    );
    handleRevalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getScheduleList(articleId));
    handleRevalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getSchedulePlaceList(articleId));
    return response;
  }
};

export default articleScheduleWriterServices;
