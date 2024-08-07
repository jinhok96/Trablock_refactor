import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleReaderServices from '@/apis/services/article/reader/fetch';
import {
  GetArticleListParams,
  GetBookmarkListParams,
  GetSearchArticleListParams
} from '@/apis/services/article/reader/type';
import { getNextPageParam, getPreviousPageParam } from '@/apis/utils/getPageParam';

export function useGetArticle(articleId: number) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetArticle', articleId] as const,
    queryFn: () => articleReaderServices.getArticle(articleId)
  });
}

export function useGetSearchArticleList(params: GetSearchArticleListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetSearchArticleList', params] as const,
    queryFn: () => articleReaderServices.getSearchArticleList(params),
    initialPageParam: 0,
    getPreviousPageParam: (res) =>
      getPreviousPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number),
    getNextPageParam: (res) => getNextPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number)
  });
}

export function useGetBookmarkList(userId: number, params: GetBookmarkListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetBookmarkList', userId, params] as const,
    queryFn: () => articleReaderServices.getBookmarkList(userId, params),
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
    queryFn: () => articleReaderServices.getAuthBannerArticleList()
  });
}

export function useGetArticleList(params: GetArticleListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE, 'useGetArticleList', params] as const,
    queryFn: () => articleReaderServices.getArticleList(params),
    initialPageParam: 0,
    getPreviousPageParam: (res) =>
      getPreviousPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number),
    getNextPageParam: (res) => getNextPageParam(res?.body.data?.total_pages, res?.body.data?.pageable.page_number)
  });
}
