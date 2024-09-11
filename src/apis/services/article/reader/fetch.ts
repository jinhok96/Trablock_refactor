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
        tags: [CACHE_TAGS.ARTICLE.getArticle(articleId)] as const,
        revalidate: REVALIDATE_TIME.MIN_01
      },
      headers
    });
    return response;
  },
  getSearchArticleList: async (
    params: GetSearchArticleListParams,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const { keyword, PAGE: page, SIZE: size, SORT: sort } = params;
    const response = await fetchJsonDefault<ResponseWrapper<GetSearchArticleListResponse>>(
      `/api/v1/search/article?${APP_QUERIES.KEYWORD}=${keyword}&${APP_QUERIES.PAGE}=${page || DEFAULT_PARAMS.PAGE}&${APP_QUERIES.SIZE}=${size || DEFAULT_PARAMS.SIZE}&${APP_QUERIES.SORT}=${sort || DEFAULT_PARAMS.SORT}`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE.getSearchArticleList(params)] as const,
          revalidate: REVALIDATE_TIME.MIN_01
        },
        headers
      }
    );
    return response;
  },
  getBookmarkList: async (
    userId: number,
    params: GetBookmarkListParams,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const { PAGE: page, SIZE: size } = params;
    const response = await fetchJsonDefault<ResponseWrapper<GetBookmarkListResponse>>(
      `/api/v1/bookmarks/${userId}?${APP_QUERIES.PAGE}=${page || DEFAULT_PARAMS.PAGE}&${APP_QUERIES.SIZE}=${size || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE.getBookmarkList(userId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        },
        headers
      }
    );
    return response;
  },
  getBannerLikesArticleList: async () => {
    const response = await fetchJsonDefault<ResponseWrapper<GetBannerLikesArticleListResponse>>(
      '/api/v1/banner/articles',
      {
        next: { tags: [CACHE_TAGS.ARTICLE.getBannerLikesArticleList()] as const, revalidate: REVALIDATE_TIME.MIN_03 }
      }
    );
    return response;
  },
  getBannerHotArticleList: async () => {
    const response = await fetchJsonDefault<ResponseWrapper<GetBannerHotArticleListResponse>>(
      '/api/v1/auth/banner/articles',
      {
        next: { tags: [CACHE_TAGS.ARTICLE.getBannerHotArticleList()] as const, revalidate: REVALIDATE_TIME.MIN_03 }
      }
    );
    return response;
  },
  getArticleList: async (params: GetArticleListParams, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const { PAGE: page, SIZE: size, SORT: sort } = params;
    const response = await fetchJsonDefault<ResponseWrapper<GetArticleListResponse>>(
      `/api/v1/articles?${APP_QUERIES.PAGE}=${page || DEFAULT_PARAMS.PAGE}&${APP_QUERIES.SIZE}=${size || DEFAULT_PARAMS.SIZE}&${APP_QUERIES.SORT}=${sort || DEFAULT_PARAMS.SORT}`,
      {
        next: { tags: [CACHE_TAGS.ARTICLE.getArticleList(params)] as const, revalidate: REVALIDATE_TIME.NONE },
        headers
      }
    );
    return response;
  },
  getArticleListByUserId: async (
    userId: number,
    params: GetArticleListByUserIdParams,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const { PAGE: page, SIZE: size } = params;
    const response = await fetchJsonDefault<ResponseWrapper<GetArticleListByUserIdResponse>>(
      `/api/v1/articles/${userId}?${APP_QUERIES.PAGE}=${page || DEFAULT_PARAMS.PAGE}&${APP_QUERIES.SIZE}=${size || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          tags: [CACHE_TAGS.ARTICLE.getArticleListByUserId(userId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        },
        headers
      }
    );
    return response;
  }
};

export default articleReaderServices;
