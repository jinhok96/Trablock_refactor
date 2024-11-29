import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { GetScheduleListResponse, GetSchedulePlaceListResponse } from '@/apis/services/articleSchedule/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

// 서버 사이드 fetch
const articleScheduleReaderServices = {
  getScheduleList: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetScheduleListResponse>>(
      `/api/v1/articles/${articleId}/schedules`,
      {
        next: {
          tags: CACHE_TAGS.ARTICLE_SCHEDULE.getScheduleList(articleId),
          revalidate: REVALIDATE_TIME.MIN_01
        },
        headers
      }
    );
    return response;
  },
  getSchedulePlaceList: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetSchedulePlaceListResponse>>(
      `/api/v1/articles/${articleId}/schedules/places`,
      {
        next: {
          tags: CACHE_TAGS.ARTICLE_SCHEDULE.getSchedulePlaceList(articleId),
          revalidate: REVALIDATE_TIME.MIN_01
        },
        headers
      }
    );
    return response;
  }
};

export default articleScheduleReaderServices;
