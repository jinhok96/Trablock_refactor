import Link from 'next/link';

import PlanCardBookmarkButton from '@/components/common/cards/PlanCardBookmarkButton';
import PlanCardDropdown from '@/components/common/cards/PlanCardDropdown';
import PlanCardInfo from '@/components/common/cards/PlanCardInfo';
import { PlanCardShapeProps } from '@/components/common/cards/type';
import ConditionalRender from '@/components/common/ConditionalRender';
import NextClientImage from '@/components/common/images/NextClientImage';
import { APP_URLS } from '@/libs/constants/appPaths';
import useContextUserData from '@/libs/hooks/useContextUserData';

export default function PlanCardShapeCard({
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
  onDeleteProfileClick,
  onBookmarkCountUpdate
}: PlanCardShapeProps) {
  const { userData } = useContextUserData();

  return (
    <div className={`flex-col-center size-full overflow-hidden rounded-xl bg-white-01 shadow-button ${className}`}>
      <Link className="size-full" href={APP_URLS.PLAN_DETAIL(articleId)}>
        <div className="flex-col-center relative size-full">
          {/* 커버 이미지 */}
          <NextClientImage
            className="aspect-video max-h-48 w-full flex-1 border-b border-gray-03"
            src={src}
            sizes={710}
            alt={`plan-card-${articleId}`}
            priority={priority}
          />
          <div className="relative size-full flex-1">
            {/* 드롭다운 */}
            <ConditionalRender condition={isEditable}>
              <PlanCardDropdown dropdownId={dropdownId} onDeleteProfileClick={onDeleteProfileClick} />
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
      </Link>
    </div>
  );
}
