import { MouseEvent, useState } from 'react';

import Link from 'next/link';

import { usePatchDeleteScheduleList } from '@/apis/services/articleSchedule/writer/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import KebabDropdownButton from '@/components/common/buttons/KebabDropdownButton';
import PlanCardBookmarkButton from '@/components/common/cards/PlanCardBookmarkButton';
import PlanCardInfo from '@/components/common/cards/PlanCardInfo';
import { PlanCardArticle } from '@/components/common/cards/type';
import ConditionalRender from '@/components/common/ConditionalRender';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import NextClientImage from '@/components/common/images/NextClientImage';
import SubmitModal from '@/components/modals/SubmitModal';
import DeleteSvg from '@/icons/trash.svg';
import DefaultCoverImg from '@/images/plan-detail-default-cover-img.png';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import { PlanCardShape } from '@/libs/contexts/PlanCardShapeContext';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';
import useContextUserData from '@/libs/hooks/useContextUserData';
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

  const { showToast } = useToast();
  const { openModal, closeModal } = useContextModal();
  const { closeDropdown } = useContextDropdown<HTMLButtonElement>(dropdownId);
  const { shape: contextShape } = useContextPlanCardShape();
  const [bookmarkCount, setBookmarkCount] = useState(bookmark_count || 0);
  const { mutate: patchDeletePlan, isPending: patchDeletePlanLoading } = usePatchDeleteScheduleList(article_id);

  const { userData: myProfile } = useContextUserData();

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

  const BookmarkComponent = (
    <ConditionalRender condition={user_id !== myProfile?.userId && !hideBookmark}>
      <PlanCardBookmarkButton
        articleId={article_id}
        initIsBookmarked={is_bookmarked}
        bookmarkCount={bookmarkCount}
        onBookmarkCountUpdate={setBookmarkCount}
      />
    </ConditionalRender>
  );

  const DropdownComponent = (
    <>
      <ConditionalRender condition={is_editable}>
        <KebabDropdownButton
          dropdownId={dropdownId}
          className="absolute right-3 top-3 size-6 md:right-4 md:top-4"
          dropdownClassName="right-3 top-9 md:right-4 md:top-10"
        >
          <DropdownItem
            className="text-red-01"
            onClick={handleDeletePlanModalOpen}
            icon={<DeleteSvg color={COLORS.RED_01} />}
            text="여행 계획 삭제"
          />
        </KebabDropdownButton>
      </ConditionalRender>
    </>
  );

  const PlanInfoComponent = (
    <PlanCardInfo article={article} hideBookmark={hideBookmark} bookmarkCount={bookmarkCount} />
  );

  const CardComponent = (
    <div className={`flex-col-center size-full overflow-hidden rounded-xl bg-white-01 shadow-button ${className}`}>
      <Link className="size-full" href={APP_URLS.PLAN_DETAIL(article_id)}>
        <div className="flex-col-center relative size-full">
          {/* 커버 이미지 */}
          <NextClientImage
            className="aspect-video max-h-48 w-full flex-1 border-b border-gray-03"
            src={cover_img_url || DefaultCoverImg.src}
            sizes={710}
            alt={`plan-card-${article_id}`}
            priority={priority}
          />
          <div className="relative size-full flex-1">
            {/* 드롭다운 */}
            {DropdownComponent}
            {/* 타이틀, 기간, 태그, 작성자, 북마크 카운트 */}
            {PlanInfoComponent}
          </div>
          {/* 북마크 버튼 */}
          {BookmarkComponent}
        </div>
      </Link>
    </div>
  );

  const BarComponent = (
    <Link className="size-full" href={APP_URLS.PLAN_DETAIL(article_id)}>
      <div className={`size-full overflow-hidden rounded-xl bg-white-01 shadow-button ${className}`}>
        <div className="relative flex size-full">
          {/* 커버 이미지 */}
          <NextClientImage
            className="aspect-video w-full max-w-60 border-r border-gray-03"
            src={cover_img_url || DefaultCoverImg.src}
            sizes={240 * 2}
            alt={`plan-card-${article_id}`}
            priority={priority}
          />
          <div className="relative size-full">
            {/* 드롭다운 */}
            {DropdownComponent}
            {/* 타이틀, 기간, 태그, 작성자, 북마크 카운트 */}
            {PlanInfoComponent}
          </div>
          {/* 북마크 버튼 */}
          {BookmarkComponent}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="size-full">
      <div className={`h-full ${shape === 'bar' && 'md:hidden'}`}>{CardComponent}</div>
      <div className={`h-full max-md:hidden ${shape !== 'bar' && 'md:hidden'}`}>{BarComponent}</div>
    </div>
  );
}
