import { ReactNode } from 'react';

import { Article } from '@/apis/services/article/reader/type';
import PlanCard, { PlanCardShape } from '@/components/common/cards/PlanCard';
import useMediaQuery from '@/libs/hooks/useMediaQuery';

type ProfileContentTabInfoContentProps = {
  list: Article[] | [];
  isBookmarkable?: boolean;
  planCardShape: PlanCardShape;
  placeholder: ReactNode;
  isEditable: boolean;
  priorityNum: number;
};

export default function ProfileContentTabInfoContent({
  list,
  isBookmarkable,
  planCardShape,
  placeholder,
  isEditable,
  priorityNum
}: ProfileContentTabInfoContentProps) {
  const { isMatch: isTablet } = useMediaQuery('min', 768);

  if (!list.length) return <p className="font-caption-1 mt-20 text-center text-gray-01 md:mt-28">{placeholder}</p>;

  if (!isTablet || planCardShape === 'card')
    return (
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${planCardShape !== 'card' && 'md:hidden'}`}>
        {list.map((article, idx) => (
          <PlanCard
            key={article.article_id}
            article={article}
            isBookmarkable={isBookmarkable}
            shape="card"
            isEditable={isEditable}
            priority={idx < priorityNum}
          />
        ))}
      </div>
    );

  return (
    <div className="flex-col-center gap-4">
      {list.map((article, idx) => (
        <PlanCard
          key={article.article_id}
          article={article}
          isBookmarkable={isBookmarkable}
          shape="bar"
          isEditable={isEditable}
          priority={idx < priorityNum}
        />
      ))}
    </div>
  );
}
