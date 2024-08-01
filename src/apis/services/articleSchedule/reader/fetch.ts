import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { GetScheduleListResponse, GetSchedulePlaceListResponse } from '@/apis/services/articleSchedule/reader/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'articleScheduleReader'> = {
  articleScheduleReader: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchArticleScheduleReader = returnFetchJson(options.articleScheduleReader);

// 서버 사이드 fetch
const articleScheduleReaderServices = {
  getScheduleList: async (articleId: number) => {
    const response = await fetchArticleScheduleReader<GetScheduleListResponse>(
      `/api/v1/articles/${articleId}/schedules`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE_SCHEDULE.getScheduleList(articleId)] as const,
          revalidate: REVALIDATE_TIME.MIN_01
        }
      }
    );
    return response.body;
  },
  getSchedulePlaceList: async (articleId: number) => {
    const response = await fetchArticleScheduleReader<GetSchedulePlaceListResponse>(
      `/api/v1/articles/${articleId}/schedules/places`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE_SCHEDULE.getSchedulePlaceList(articleId)] as const,
          revalidate: REVALIDATE_TIME.MIN_01
        }
      }
    );
    return response.body;
  }
};

export default articleScheduleReaderServices;
