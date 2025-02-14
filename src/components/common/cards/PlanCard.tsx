import { MouseEvent, useState } from 'react';

import PlanCardShapeBar from '@/components/common/cards/PlanCardShapeBar';
import PlanCardShapeCard from '@/components/common/cards/PlanCardShapeCard';
import { PlanCardArticle } from '@/components/common/cards/type';
import DeletePlanModal from '@/components/modals/DeletePlanModal';
import DefaultCoverImg from '@/images/plan-detail-default-cover-img.png';
import { APP_URLS } from '@/libs/constants/appPaths';
import { PlanCardShape } from '@/libs/contexts/PlanCardShapeContext';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';
import useRouter from '@/libs/hooks/useRouter';

export type PlanCardProps = {
  article: PlanCardArticle;
  className?: string;
  priority?: boolean;
  hideBookmark?: boolean;
  forceShape?: PlanCardShape;
};

const PLAN_CARD_DROPDOWN_ID = 'planCard';

export default function PlanCard({ article, className, priority, hideBookmark, forceShape }: PlanCardProps) {
  const { article_id, user_id, cover_img_url, bookmark_count, is_bookmarked, is_editable } = article;

  const dropdownId = `${PLAN_CARD_DROPDOWN_ID}-${article_id}`;
  const coverImgUrl = cover_img_url || DefaultCoverImg.src;

  const router = useRouter();
  const { openModal } = useContextModal();
  const { closeDropdown } = useContextDropdown<HTMLButtonElement>(dropdownId);
  const { shape: contextShape } = useContextPlanCardShape();
  const [bookmarkCount, setBookmarkCount] = useState(bookmark_count || 0);

  const shape = forceShape || contextShape;

  const handleEditPlanClick = (e: MouseEvent) => {
    e.preventDefault();
    closeDropdown();
    router.push(APP_URLS.PLAN_EDIT(article_id));
  };

  const handleDeletePlanModalOpen = (e: MouseEvent) => {
    e.preventDefault();
    closeDropdown();
    openModal(<DeletePlanModal articleId={article_id} />);
  };

  const handleBookmarkCountUpdate = (bookmarkCount: number) => {
    setBookmarkCount(bookmarkCount);
  };

  return (
    <div className="size-full">
      {/* 카드형 */}
      <div className={`h-full ${shape === 'bar' && 'md:hidden'}`}>
        <PlanCardShapeCard
          className={className}
          userId={user_id}
          articleId={article_id}
          dropdownId={dropdownId}
          article={article}
          src={coverImgUrl}
          priority={priority}
          isEditable={is_editable}
          bookmarkCount={bookmarkCount}
          initIsBookmarked={is_bookmarked}
          hideBookmark={hideBookmark}
          onEditPlanClick={handleEditPlanClick}
          onDeletePlanClick={handleDeletePlanModalOpen}
          onBookmarkCountUpdate={handleBookmarkCountUpdate}
        />
      </div>
      {/* 바형 */}
      <div className={`h-full max-md:hidden ${shape !== 'bar' && 'md:hidden'}`}>
        <PlanCardShapeBar
          className={className}
          userId={user_id}
          articleId={article_id}
          dropdownId={dropdownId}
          article={article}
          src={coverImgUrl}
          priority={priority}
          isEditable={is_editable}
          bookmarkCount={bookmarkCount}
          initIsBookmarked={is_bookmarked}
          hideBookmark={hideBookmark}
          onEditPlanClick={handleEditPlanClick}
          onDeletePlanClick={handleDeletePlanModalOpen}
          onBookmarkCountUpdate={handleBookmarkCountUpdate}
        />
      </div>
    </div>
  );
}
