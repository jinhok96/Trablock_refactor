import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleReaderServices from '@/apis/services/article/reader/fetch';
import {
  GetArticleListParams,
  GetBookmarkListParams,
  GetSearchArticleListParams
} from '@/apis/services/article/reader/type';
import { getNextPageParam, getPreviousPageParam } from '@/apis/utils/getPageParam';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function useGetArticle(articleId: number) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetArticle', articleId] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleReaderServices.getArticle(articleId, headers);
    }
  });
}

export function useGetSearchArticleList(params: GetSearchArticleListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetSearchArticleList', params] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleReaderServices.getSearchArticleList(params, headers);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) =>
      getPreviousPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number),
    getNextPageParam: (res) => getNextPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number)
  });
}

export function useGetBookmarkList(userId: number, params: GetBookmarkListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetBookmarkList', userId, params] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleReaderServices.getBookmarkList(userId, params, headers);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) =>
      getPreviousPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number),
    getNextPageParam: (res) => getNextPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number)
  });
}

export function useGetBannerArticleList() {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetBannerArticleList'] as const,
    queryFn: () => articleReaderServices.getBannerArticleList()
  });
}

export function useGetAuthBannerArticleList() {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetAuthBannerArticleList'] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleReaderServices.getAuthBannerArticleList(headers);
    }
  });
}

export function useGetArticleList(params: GetArticleListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetArticleList', params] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleReaderServices.getArticleList(params, headers);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) =>
      getPreviousPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number),
    getNextPageParam: (res) => getNextPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number)
  });
}
