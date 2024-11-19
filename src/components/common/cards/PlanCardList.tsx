'use client';

import { ReactNode } from 'react';

import { Article } from '@/apis/services/article/reader/type';
import PlanCard, { PlanCardProps } from '@/components/common/cards/PlanCard';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';

interface PlanCardListProps extends Pick<PlanCardProps, 'hideBookmark' | 'forceShape'> {
  cardList: Article[] | [];
  placeholder: ReactNode;
  isEditable?: boolean;
  priorityNum: number;
  smallGridColsOnDt?: boolean;
}

export default function PlanCardList({
  cardList,
  placeholder,
  isEditable,
  priorityNum,
  smallGridColsOnDt,
  hideBookmark,
  forceShape
}: PlanCardListProps) {
  const { shape: contextShape } = useContextPlanCardShape();

  const shape = forceShape || contextShape;

  if (!cardList.length) return <p className="font-caption-1 py-14 text-center text-gray-01 md:py-20">{placeholder}</p>;

  return (
    <div
      className={`grid gap-4 ${shape === 'card' && `md:grid-cols-2 ${!smallGridColsOnDt && 'xl:grid-cols-3'}`} ${shape === 'bar' && `md:grid-cols-1 ${!smallGridColsOnDt && 'xl:grid-cols-2'}`}`}
    >
      {cardList.map((article, idx) => (
        <PlanCard
          key={article.article_id}
          article={article}
          isEditable={isEditable}
          priority={idx < priorityNum}
          hideBookmark={hideBookmark}
          forceShape={forceShape}
        />
      ))}
    </div>
  );
}
