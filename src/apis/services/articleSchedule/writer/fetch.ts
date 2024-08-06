import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  PatchDeleteScheduleListResponse,
  PutScheduleListPayload,
  PutScheduleListResponse
} from '@/apis/services/articleSchedule/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'articleScheduleWriter'> = {
  articleScheduleWriter: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchArticleScheduleWriter = returnFetchJson(options.articleScheduleWriter);

// 서버 사이드 fetch
const articleScheduleWriterServices = {
  putScheduleList: async (articleId: number, payload: PutScheduleListPayload) => {
    const response = await fetchArticleScheduleWriter<ResponseWrapper<PutScheduleListResponse>>(
      `/api/v1/articles/${articleId}/schedules`,
      {
        method: METHOD.PUT,
        body: payload
      }
    );
    revalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getScheduleList(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getSchedulePlaceList(articleId));
    return response;
  },
  patchDeleteScheduleList: async (articleId: number) => {
    const response = await fetchArticleScheduleWriter<ResponseWrapper<PatchDeleteScheduleListResponse>>(
      `/api/v1/articles/${articleId}/status`,
      {
        method: METHOD.PATCH
      }
    );
    revalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getScheduleList(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE_SCHEDULE.getSchedulePlaceList(articleId));
    return response;
  }
};

export default articleScheduleWriterServices;
