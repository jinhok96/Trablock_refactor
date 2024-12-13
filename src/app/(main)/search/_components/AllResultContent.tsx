'use client';

import { useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { ResponseGenericBody } from '@/apis/httpClient/httpClientJson';
import { GetArticleListResponse, GetSearchArticleListResponse } from '@/apis/services/article/reader/type';
import { useGetArticleList } from '@/apis/services/article/reader/useService';
import { ResponseWrapper, SortParam } from '@/apis/types/common';
import PlanCardList from '@/components/common/cards/PlanCardList';
import PlanCardShapeSelector from '@/components/common/cards/PlanCardShapeSelector';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import useIntersectingState from '@/libs/hooks/useIntersectingState';
import useRouter from '@/libs/hooks/useRouter';
import useSearchParams from '@/libs/hooks/useSearchParams';

type AllResultContentProps = {
  params: {
    sort: SortParam;
  };
  data: GetArticleListResponse;
};

function handleFlatMapList(
  res?: InfiniteData<ResponseGenericBody<ResponseWrapper<GetSearchArticleListResponse>>, unknown>
) {
  if (!res) return null;
  return res.pages.flatMap((item) => {
    if (!item.body.data) return [];
    const { content } = item.body.data;
    if (!content.length) return [];
    return content;
  });
}

export default function AllResultContent({ params, data }: AllResultContentProps) {
  const { sort: initSort } = params;
  const { content, total_elements } = data;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(initSort);
  const [searchListResult, setSearchResultList] = useState(content);
  const { ref: searchResultIntersectRef, isIntersecting: isSearchResultIntersecting } =
    useIntersectingState<HTMLDivElement>();

  const { fetchNextPage: fetchNextPlanListPage, hasNextPage: hasNextPlanListPage } = useGetArticleList({ sort });

  const handleSortSelect = (value: SortParam) => {
    setSort(value);
    const newHref = pathname + '?' + searchParams.updateQuery(APP_QUERIES.SORT, value);
    router.hardPush(newHref);
  };

  // 무한 스크롤
  useEffect(() => {
    if (!isSearchResultIntersecting) return;

    const fetchNextPage = async () => {
      if (!hasNextPlanListPage) return;

      const res = await fetchNextPlanListPage();
      if (!res?.data) return;

      const newList = handleFlatMapList(res.data);
      if (!newList) return;

      setSearchResultList(newList);
    };

    fetchNextPage();
  }, [isSearchResultIntersecting, hasNextPlanListPage]);

  return (
    <div>
      <div className="flex-row-center mb-5 justify-between">
        <p className="font-caption-1 md:text-lg">전체 {total_elements}개</p>
        <div className="flex-row-center gap-4">
          <PlanCardShapeSelector />
          <SortDropdown sort={sort} onSelect={handleSortSelect} />
        </div>
      </div>
      <PlanCardList cardList={searchListResult} placeholder="검색 결과가 없습니다." priorityNum={content.length} />
      <div ref={searchResultIntersectRef} />
    </div>
  );
}
