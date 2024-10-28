import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleReaderServices from '@/apis/services/article/reader/fetch';
import {
  GetArticleListByUserIdParams,
  GetArticleListParams,
  GetBookmarkListParams,
  GetSearchArticleListParams
} from '@/apis/services/article/reader/type';
import { getNextPageParam, getPreviousPageParam } from '@/apis/utils/getPageParam';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function useGetArticle(articleId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetArticle', articleId] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleReaderServices.getArticle(articleId, headers);
    }
  });
}

export function useGetSearchArticleList(params: GetSearchArticleListParams = DEFAULT_PARAMS && { keyword: '' }) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetSearchArticleList', params] as const,
    queryFn: async ({ pageParam = params.page || 0 }) => {
      const headers = await getAuthorizationTokenHeader();
      const currentParams: GetSearchArticleListParams = { ...params, page: pageParam };
      return articleReaderServices.getSearchArticleList(headers, currentParams);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, first, pageable } = res.body.data;
      const { page_number } = pageable;
      return getPreviousPageParam(page_number, empty, first);
    },
    getNextPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, last, pageable } = res.body.data;
      const { page_number } = pageable;
      return getNextPageParam(page_number, empty, last);
    }
  });
}

export function useGetBookmarkList(userId: number, params: GetBookmarkListParams = DEFAULT_PARAMS) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetBookmarkList', userId, params] as const,
    queryFn: async ({ pageParam = params.page || 0 }) => {
      const headers = await getAuthorizationTokenHeader();
      const currentParams = { ...params, page: pageParam };
      return articleReaderServices.getBookmarkList(userId, headers, currentParams);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, first, pageable } = res.body.data;
      const { page_number } = pageable;
      return getPreviousPageParam(page_number, empty, first);
    },
    getNextPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, last, pageable } = res.body.data;
      const { page_number } = pageable;
      return getNextPageParam(page_number, empty, last);
    }
  });
}

export function useGetBannerLikesArticleList() {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetBannerLikesArticleList'] as const,
    queryFn: () => articleReaderServices.getBannerLikesArticleList()
  });
}

export function useGetBannerHotArticleList() {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetBannerHotArticleList'] as const,
    queryFn: () => articleReaderServices.getBannerHotArticleList()
  });
}

export function useGetArticleList(params: GetArticleListParams = DEFAULT_PARAMS) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetArticleList', params] as const,
    queryFn: async ({ pageParam = params.page || 0 }) => {
      const headers = await getAuthorizationTokenHeader();
      const currentParams: GetArticleListParams = { ...params, page: pageParam };
      return articleReaderServices.getArticleList(headers, currentParams);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, first, pageable } = res.body.data;
      const { page_number } = pageable;
      return getPreviousPageParam(page_number, empty, first);
    },
    getNextPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, last, pageable } = res.body.data;
      const { page_number } = pageable;
      return getNextPageParam(page_number, empty, last);
    }
  });
}

export function useGetArticleListByUserId(userId: number, params: GetArticleListByUserIdParams = DEFAULT_PARAMS) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetArticleListByUserId', userId, params] as const,
    queryFn: async ({ pageParam = params.page || 0 }) => {
      const headers = await getAuthorizationTokenHeader();
      const currentParams: GetArticleListByUserIdParams = { ...params, page: pageParam };
      return articleReaderServices.getArticleListByUserId(userId, headers, currentParams);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, first, pageable } = res.body.data;
      const { page_number } = pageable;
      return getPreviousPageParam(page_number, empty, first);
    },
    getNextPageParam: (res) => {
      if (!res.body.data) return;
      const { empty, last, pageable } = res.body.data;
      const { page_number } = pageable;
      return getNextPageParam(page_number, empty, last);
    }
  });
}
