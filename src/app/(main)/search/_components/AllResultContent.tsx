'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { GetArticleListResponse } from '@/apis/services/article/reader/type';
import { useGetArticleList } from '@/apis/services/article/reader/useService';
import { SortParam } from '@/apis/types/common';
import PlanCardList from '@/components/common/cards/PlanCardList';
import PlanCardShapeSelector from '@/components/common/cards/PlanCardShapeSelector';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import useInfiniteScrollList from '@/libs/hooks/useInfiniteScrollList';
import useRouter from '@/libs/hooks/useRouter';
import useSearchParams from '@/libs/hooks/useSearchParams';

type AllResultContentProps = {
  params: {
    sort: SortParam;
  };
  data: GetArticleListResponse;
};

export default function AllResultContent({ params, data }: AllResultContentProps) {
  const { sort: initSort } = params;
  const { content, total_elements } = data;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(initSort);

  const useGetArticleListRes = useGetArticleList({ sort });
  const { ref: searchResultIntersectRef, list: allResultList } = useInfiniteScrollList<HTMLDivElement>(
    content,
    useGetArticleListRes
  );

  const handleSortSelect = (value: SortParam) => {
    setSort(value);
    const newHref = pathname + '?' + searchParams.updateQuery(APP_QUERIES.SORT, value);
    router.hardPush(newHref);
  };

  return (
    <div>
      <div className="flex-row-center mb-5 justify-between">
        <p className="font-caption-1 md:text-lg">전체 {total_elements}개</p>
        <div className="flex-row-center gap-4">
          <PlanCardShapeSelector />
          <SortDropdown sort={sort} onSelect={handleSortSelect} />
        </div>
      </div>
      <PlanCardList cardList={allResultList} placeholder="검색 결과가 없습니다." priorityNum={content.length} />
      <div ref={searchResultIntersectRef} />
    </div>
  );
}
