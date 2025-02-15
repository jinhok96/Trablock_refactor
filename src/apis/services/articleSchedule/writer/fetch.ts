import { CACHE_TAGS_PREFIX } from '@/apis/constants/cacheTags';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import { PutScheduleListPayload, PutScheduleListResponse } from '@/apis/services/articleSchedule/writer/type';
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
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE_SCHEDULE);
    return response;
  }
};

export default articleScheduleWriterServices;
