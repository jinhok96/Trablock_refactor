import { ReactNode } from 'react';

import { Article } from '@/apis/services/article/reader/type';
import PlanCard from '@/components/common/cards/PlanCard';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';
import useMediaQuery from '@/libs/hooks/useMediaQuery';

type PlanCardListProps = {
  cardList: Article[] | [];
  placeholder: ReactNode;
  isEditable?: boolean;
  priorityNum: number;
};

export default function PlanCardList({ cardList, placeholder, isEditable, priorityNum }: PlanCardListProps) {
  const { isMatch: isTablet } = useMediaQuery('min', 768);
  const { shape } = useContextPlanCardShape();

  if (!shape) return;

  if (!cardList.length) return <p className="font-caption-1 mt-20 text-center text-gray-01 md:mt-28">{placeholder}</p>;

  if (!isTablet || shape === 'card')
    return (
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${shape !== 'card' && 'md:hidden'}`}>
        {cardList.map((article, idx) => (
          <PlanCard key={article.article_id} article={article} isEditable={isEditable} priority={idx < priorityNum} />
        ))}
      </div>
    );

  return (
    <div className="flex-col-center gap-4">
      {cardList.map((article, idx) => (
        <PlanCard key={article.article_id} article={article} isEditable={isEditable} priority={idx < priorityNum} />
      ))}
    </div>
  );
}
