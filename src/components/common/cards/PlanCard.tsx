import { MouseEvent, useState } from 'react';

import { usePatchDeleteScheduleList } from '@/apis/services/articleSchedule/writer/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import PlanCardShapeBar from '@/components/common/cards/PlanCardShapeBar';
import PlanCardShapeCard from '@/components/common/cards/PlanCardShapeCard';
import { PlanCardArticle } from '@/components/common/cards/type';
import SubmitModal from '@/components/modals/SubmitModal';
import DefaultCoverImg from '@/images/plan-detail-default-cover-img.png';
import { PlanCardShape } from '@/libs/contexts/PlanCardShapeContext';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';
import useToast from '@/libs/hooks/useToast';

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

  const { showToast } = useToast();
  const { openModal, closeModal } = useContextModal();
  const { closeDropdown } = useContextDropdown<HTMLButtonElement>(dropdownId);
  const { shape: contextShape } = useContextPlanCardShape();
  const [bookmarkCount, setBookmarkCount] = useState(bookmark_count || 0);
  const { mutate: patchDeletePlan, isPending: patchDeletePlanLoading } = usePatchDeleteScheduleList(article_id);

  const shape = forceShape || contextShape;

  const handleDeletePlan = () => {
    patchDeletePlan(void 0, {
      onSuccess: (res) => {
        const { data, error } = res.body;
        if (!data || error) {
          const message = translateErrorCode(error?.code);
          return showToast(message, 'error');
        }
        closeModal();
        showToast('여행 계획 삭제 성공!', 'success');
      }
    });
  };

  const handleDeletePlanModalOpen = (e: MouseEvent) => {
    e.preventDefault();
    closeDropdown();
    openModal(
      <SubmitModal
        className="!max-w-80 md:!max-w-96"
        submitText="삭제하기"
        negative
        onCancel={() => closeModal()}
        onSubmit={() => handleDeletePlan()}
        isLoading={patchDeletePlanLoading}
      >
        여행 계획을 삭제하시겠습니까?
      </SubmitModal>
    );
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
          onDeleteProfileClick={handleDeletePlanModalOpen}
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
          onDeleteProfileClick={handleDeletePlanModalOpen}
          onBookmarkCountUpdate={handleBookmarkCountUpdate}
        />
      </div>
    </div>
  );
}
