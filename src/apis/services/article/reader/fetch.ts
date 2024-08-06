import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  GetArticleListByUserIdParams,
  GetArticleListByUserIdResponse,
  GetArticleListParams,
  GetArticleListResponse,
  GetArticleResponse,
  GetAuthBannerArticleListResponse,
  GetBannerArticleListResponse,
  GetBookmarkListParams,
  GetBookmarkListResponse,
  GetSearchArticleListParams,
  GetSearchArticleListResponse
} from '@/apis/services/article/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'articleReader' | 'articleWithoutAuth'> = {
  articleReader: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  },
  articleWithoutAuth: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchArticleReader = returnFetchJson(options.articleReader);
const fetchArticleWithoutAuth = returnFetchJson(options.articleWithoutAuth);

const articleReaderServices = {
  getArticle: async (articleId: number) => {
    const response = await fetchArticleReader<ResponseWrapper<GetArticleResponse>>(`/api/v1/article/${articleId}`, {
      next: {
        tags: [CACHE_TAGS.ARTICLE.getArticle(articleId)] as const,
        revalidate: REVALIDATE_TIME.MIN_01
      }
    });
    return response;
  },
  getSearchArticleList: async (params: GetSearchArticleListParams) => {
    const { keyword, PAGE: page, SIZE: size, SORT: sort } = params;
    const response = await fetchArticleReader<ResponseWrapper<GetSearchArticleListResponse>>(
      `/api/v1/search/article?keyword=${keyword}&page=${page || DEFAULT_PARAMS.PAGE}&size=${size || DEFAULT_PARAMS.SIZE}&sort=${sort || DEFAULT_PARAMS.SORT}`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE.getSearchArticleList(params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        }
      }
    );
    return response;
  },
  getBookmarkList: async (userId: number, params: GetBookmarkListParams) => {
    const { PAGE: page, SIZE: size } = params;
    const response = await fetchArticleReader<ResponseWrapper<GetBookmarkListResponse>>(
      `/api/v1/bookmarks/${userId}?page=${page || DEFAULT_PARAMS.PAGE}&size=${size || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE.getBookmarkList(userId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        }
      }
    );
    return response;
  },
  getBannerArticleList: async () => {
    const response = await fetchArticleWithoutAuth<ResponseWrapper<GetBannerArticleListResponse>>(
      '/api/v1/banner/articles',
      {
        next: { tags: [CACHE_TAGS.ARTICLE.getBannerArticleList()] as const, revalidate: REVALIDATE_TIME.MIN_03 }
      }
    );
    return response;
  },
  getAuthBannerArticleList: async () => {
    const response = await fetchArticleReader<ResponseWrapper<GetAuthBannerArticleListResponse>>(
      '/api/v1/auth/banner/articles',
      {
        next: { tags: [CACHE_TAGS.ARTICLE.getAuthBannerArticleList()] as const, revalidate: REVALIDATE_TIME.MIN_03 }
      }
    );
    return response;
  },
  getArticleList: async (params: GetArticleListParams) => {
    const { PAGE: page, SIZE: size, SORT: sort } = params;
    const response = await fetchArticleReader<ResponseWrapper<GetArticleListResponse>>(
      `/api/v1/articles?page=${page || DEFAULT_PARAMS.PAGE}&size=${size || DEFAULT_PARAMS.SIZE}&sort=${sort || DEFAULT_PARAMS.SORT}`,
      {
        next: { tags: [CACHE_TAGS.ARTICLE.getArticleList(params)] as const, revalidate: REVALIDATE_TIME.NONE }
      }
    );
    return response;
  },
  getArticleListByUserId: async (userId: number, params: GetArticleListByUserIdParams) => {
    const { PAGE: page, SIZE: size } = params;
    const response = await fetchArticleReader<ResponseWrapper<GetArticleListByUserIdResponse>>(
      `/api/v1/articles/${userId}?page=${page || DEFAULT_PARAMS.PAGE}&size=${size || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE.getArticleListByUserId(userId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        }
      }
    );
    return response;
  }
};

export default articleReaderServices;
