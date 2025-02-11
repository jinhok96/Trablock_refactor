import { useEffect, useState } from 'react';

import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import { ResponseGenericBody } from '@/apis/httpClient/httpClient';
import { Article, PaginationArticleListWithContent } from '@/apis/services/article/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

type UseInfiniteQueryResultProps = UseInfiniteQueryResult<
  InfiniteData<ResponseGenericBody<ResponseWrapper<PaginationArticleListWithContent>>, unknown>,
  Error
>;

function handleFlatMapList(
  res?: InfiniteData<ResponseGenericBody<ResponseWrapper<PaginationArticleListWithContent>>, unknown>
): Article[] | null {
  if (!res) return null;

  return res.pages.flatMap((item) => {
    if (!item.body.data) return [];
    return item.body.data.content;
  });
}

export default function useInfiniteScrollList<T extends HTMLElement>(
  initList: Article[],
  { data, fetchNextPage, hasNextPage }: UseInfiniteQueryResultProps
) {
  const { ref, isIntersecting } = useIntersectingState<T>();
  const [list, setList] = useState<Article[]>(initList);

  useEffect(() => {
    const newList = handleFlatMapList(data);
    if (!newList) return;
    if (isEqual(newList, list)) return;
    setList(newList);
  }, [data]);

  useEffect(() => {
    if (!isIntersecting) return;
    if (!hasNextPage) return;

    const handleFetchNextPage = async () => {
      const res = await fetchNextPage();
      if (!res?.data) return;

      const newList = handleFlatMapList(res.data);
      if (!newList) return;

      setList(newList);
    };

    handleFetchNextPage();
  }, [isIntersecting, hasNextPage]);

  return { ref, list };
}
