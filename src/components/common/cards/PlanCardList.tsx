'use client';

import { ReactNode } from 'react';

import { Article } from '@/apis/services/article/reader/type';
import PlanCard from '@/components/common/cards/PlanCard';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';

type PlanCardListProps = {
  cardList: Article[] | [];
  placeholder: ReactNode;
  isEditable?: boolean;
  priorityNum: number;
  smallGridColsOnDt?: boolean;
};

export default function PlanCardList({
  cardList,
  placeholder,
  isEditable,
  priorityNum,
  smallGridColsOnDt
}: PlanCardListProps) {
  const { shape } = useContextPlanCardShape();

  const gridColsOnCardDt = smallGridColsOnDt ? 2 : 3;
  const gridColsOnBarDt = smallGridColsOnDt ? 1 : 2;

  if (!cardList.length) return <p className="font-caption-1 mt-20 text-center text-gray-01 md:mt-28">{placeholder}</p>;

  return (
    <div
      className={`grid gap-4 md:grid-cols-2 xl:grid-cols-${gridColsOnCardDt} ${shape === 'bar' && `md:!grid-cols-1 md:gap-4 xl:!grid-cols-${gridColsOnBarDt}`}`}
    >
      {cardList.map((article, idx) => (
        <PlanCard key={article.article_id} article={article} isEditable={isEditable} priority={idx < priorityNum} />
      ))}
    </div>
  );
}
