import { ReactNode } from 'react';

import { Article } from '@/apis/services/article/reader/type';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import PlanCard, { PlanCardShape } from '@/components/common/cards/PlanCard';
import useMediaQuery from '@/libs/hooks/useMediaQuery';

type PlanCardListProps = {
  cardList: Article[] | [];
  planCardShape: PlanCardShape;
  placeholder: ReactNode;
  isEditable?: boolean;
  priorityNum: number;
  myProfile: GetUserProfileResponse;
};

export default function PlanCardList({
  cardList,
  planCardShape,
  placeholder,
  isEditable,
  priorityNum,
  myProfile
}: PlanCardListProps) {
  const { isMatch: isTablet } = useMediaQuery('min', 768);

  if (!cardList.length) return <p className="font-caption-1 mt-20 text-center text-gray-01 md:mt-28">{placeholder}</p>;

  if (!isTablet || planCardShape === 'card')
    return (
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${planCardShape !== 'card' && 'md:hidden'}`}>
        {cardList.map((article, idx) => (
          <PlanCard
            key={article.article_id}
            article={article}
            shape="card"
            isEditable={isEditable}
            priority={idx < priorityNum}
            myProfile={myProfile}
          />
        ))}
      </div>
    );

  return (
    <div className="flex-col-center gap-4">
      {cardList.map((article, idx) => (
        <PlanCard
          key={article.article_id}
          article={article}
          shape="bar"
          isEditable={isEditable}
          priority={idx < priorityNum}
          myProfile={myProfile}
        />
      ))}
    </div>
  );
}
