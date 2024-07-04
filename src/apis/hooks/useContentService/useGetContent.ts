// useGetContent.ts
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';

import { articleService, bookmarkService } from './fetch';
import { ArticlesResponse } from './type';

const useGetArticles = (userId: string) => {
  return useInfiniteQuery<ArticlesResponse, Error>({
    queryKey: ['articles', userId],
    queryFn: async ({ pageParam = 0 }: QueryFunctionContext) => {
      const data = await articleService.getArticles(userId, pageParam as number);
      console.log('Fetched articles data:', data);
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.page_number + 1;
    },
    initialPageParam: 0
  });
};

const useGetBookmarks = (userId: string) => {
  return useInfiniteQuery<ArticlesResponse, Error>({
    queryKey: ['bookmarks', userId],
    queryFn: async ({ pageParam = 0 }: QueryFunctionContext) => {
      const data = await bookmarkService.getBookmarks(userId, pageParam as number);
      console.log('Fetched bookmarks data:', data);
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.page_number + 1;
    },
    initialPageParam: 0
  });
};

export { useGetArticles, useGetBookmarks };
