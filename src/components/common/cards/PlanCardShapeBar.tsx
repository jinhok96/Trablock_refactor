import Link from 'next/link';

import PlanCardBookmarkButton from '@/components/common/cards/PlanCardBookmarkButton';
import PlanCardDropdown from '@/components/common/cards/PlanCardDropdown';
import PlanCardInfo from '@/components/common/cards/PlanCardInfo';
import { PlanCardShapeProps } from '@/components/common/cards/type';
import ConditionalRender from '@/components/common/ConditionalRender';
import NextClientImage from '@/components/common/images/NextClientImage';
import { APP_URLS } from '@/libs/constants/appPaths';
import useContextUserData from '@/libs/hooks/useContextUserData';

export default function PlanCardShapeBar({
  className,
  userId,
  articleId,
  dropdownId,
  article,
  src,
  priority,
  isEditable,
  bookmarkCount,
  initIsBookmarked,
  hideBookmark,
  onEditPlanClick,
  onDeletePlanClick,
  onBookmarkCountUpdate
}: PlanCardShapeProps) {
  const { userData } = useContextUserData();

  return (
    <Link className="size-full" href={APP_URLS.PLAN_DETAIL(articleId)}>
      <div className={`size-full overflow-hidden rounded-xl bg-white-01 shadow-button ${className}`}>
        <div className="relative flex size-full">
          {/* 커버 이미지 */}
          <NextClientImage
            className="aspect-video w-full max-w-60 border-r border-gray-03"
            src={src}
            sizes={240 * 2}
            alt={`plan-card-${articleId}`}
            priority={priority}
          />
          <div className="relative size-full">
            {/* 드롭다운 */}
            <ConditionalRender condition={isEditable}>
              <PlanCardDropdown
                dropdownId={dropdownId}
                onEditPlanClick={onEditPlanClick}
                onDeletePlanClick={onDeletePlanClick}
              />
            </ConditionalRender>
            {/* 타이틀, 기간, 태그, 작성자, 북마크 카운트 */}
            <PlanCardInfo article={article} hideBookmark={hideBookmark} bookmarkCount={bookmarkCount} />
          </div>
          {/* 북마크 버튼 */}
          <ConditionalRender condition={userId !== userData?.userId && !hideBookmark}>
            <PlanCardBookmarkButton
              articleId={articleId}
              initIsBookmarked={initIsBookmarked}
              bookmarkCount={bookmarkCount}
              onBookmarkCountUpdate={onBookmarkCountUpdate}
            />
          </ConditionalRender>
        </div>
      </div>
    </Link>
  );
}
