import { CACHE_TAGS_PREFIX } from '@/apis/constants/cacheTags';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
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
    const response = await httpClientDefault.put<ResponseWrapper<PutScheduleListResponse>>(
      `/api/v1/articles/${articleId}/schedules`,
      { body: payload, headers }
    );
    handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE_SCHEDULE);
    return response;
  },
  patchDeleteScheduleList: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await httpClientDefault.patch<ResponseWrapper<PatchDeleteScheduleListResponse>>(
      `/api/v1/articles/${articleId}/status`,
      { headers }
    );
    handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE_SCHEDULE);
    return response;
  }
};

export default articleScheduleWriterServices;
