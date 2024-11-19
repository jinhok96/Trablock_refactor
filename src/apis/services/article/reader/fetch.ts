import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  GetArticleListByUserIdParams,
  GetArticleListByUserIdResponse,
  GetArticleListParams,
  GetArticleListResponse,
  GetArticleResponse,
  GetBannerHotArticleListResponse,
  GetBannerLikesArticleListResponse,
  GetBookmarkListParams,
  GetBookmarkListResponse,
  GetSearchArticleListParams,
  GetSearchArticleListResponse
} from '@/apis/services/article/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { APP_QUERIES } from '@/libs/constants/appPaths';

const articleReaderServices = {
  getArticle: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetArticleResponse>>(`/api/v1/article/${articleId}`, {
      next: {
        tags: CACHE_TAGS.ARTICLE.getArticle(articleId),
        revalidate: REVALIDATE_TIME.MIN_01
      },
      headers
    });
    return response;
  },
  getSearchArticleList: async (
    headers: Pick<HeaderTokens, 'Authorization-Token'>,
    params: GetSearchArticleListParams
  ) => {
    const fullParams = { ...DEFAULT_PARAMS, ...params };
    const { keyword, page, size, sort } = fullParams;
    const response = await fetchJsonDefault<ResponseWrapper<GetSearchArticleListResponse>>(
      `/api/v1/search/article?${APP_QUERIES.KEYWORD}=${keyword}&${APP_QUERIES.PAGE}=${page}&${APP_QUERIES.SIZE}=${size}&${APP_QUERIES.SORT}=${sort}`,
      {
        next: {
          tags: CACHE_TAGS.ARTICLE.getSearchArticleList(fullParams),
          revalidate: REVALIDATE_TIME.MIN_01
        },
        headers
      }
    );
    return response;
  },
  getBookmarkList: async (
    userId: number,
    headers: Pick<HeaderTokens, 'Authorization-Token'>,
    params?: GetBookmarkListParams
  ) => {
    const fullParams = { ...DEFAULT_PARAMS, ...params };
    const { page, size } = fullParams;
    const response = await fetchJsonDefault<ResponseWrapper<GetBookmarkListResponse>>(
      `/api/v1/bookmarks/${userId}?${APP_QUERIES.PAGE}=${page}&${APP_QUERIES.SIZE}=${size}`,
      {
        next: {
          tags: CACHE_TAGS.ARTICLE.getBookmarkList(userId, fullParams),
          revalidate: REVALIDATE_TIME.NONE
        },
        headers
      }
    );
    return response;
  },
  getBannerLikesArticleList: async () => {
    const response = await fetchJsonDefault<ResponseWrapper<GetBannerLikesArticleListResponse>>(
      '/api/v1/banner/articles/likes',
      {
        next: { tags: CACHE_TAGS.ARTICLE.getBannerLikesArticleList(), revalidate: REVALIDATE_TIME.MIN_03 }
      }
    );
    return response;
  },
  getBannerHotArticleList: async () => {
    const response = await fetchJsonDefault<ResponseWrapper<GetBannerHotArticleListResponse>>(
      '/api/v1/banner/articles/hot',
      {
        next: { tags: CACHE_TAGS.ARTICLE.getBannerHotArticleList(), revalidate: REVALIDATE_TIME.MIN_03 }
      }
    );
    return response;
  },
  getArticleList: async (headers: Pick<HeaderTokens, 'Authorization-Token'>, params?: GetArticleListParams) => {
    const fullParams = { ...DEFAULT_PARAMS, ...params };
    const { page, size, sort } = fullParams;
    const response = await fetchJsonDefault<ResponseWrapper<GetArticleListResponse>>(
      `/api/v1/articles?${APP_QUERIES.PAGE}=${page}&${APP_QUERIES.SIZE}=${size}&${APP_QUERIES.SORT}=${sort}`,
      {
        next: { tags: CACHE_TAGS.ARTICLE.getArticleList(fullParams), revalidate: REVALIDATE_TIME.NONE },
        headers
      }
    );
    return response;
  },
  getArticleListByUserId: async (
    userId: number,
    headers: Pick<HeaderTokens, 'Authorization-Token'>,
    params?: GetArticleListByUserIdParams
  ) => {
    const fullParams = { ...DEFAULT_PARAMS, ...params };
    const { page, size } = fullParams;
    const response = await fetchJsonDefault<ResponseWrapper<GetArticleListByUserIdResponse>>(
      `/api/v1/articles/${userId}?${APP_QUERIES.PAGE}=${page}&${APP_QUERIES.SIZE}=${size}`,
      {
        next: {
          tags: CACHE_TAGS.ARTICLE.getArticleListByUserId(userId, fullParams),
          revalidate: REVALIDATE_TIME.NONE
        },
        headers
      }
    );
    return response;
  }
};

export default articleReaderServices;
