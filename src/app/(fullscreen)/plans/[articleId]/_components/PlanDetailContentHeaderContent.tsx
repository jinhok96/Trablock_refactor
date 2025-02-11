import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { usePatchLikeArticle } from '@/apis/services/article/like/useService';
import { GetArticleResponse } from '@/apis/services/article/reader/type';
import { ScheduleDetail } from '@/apis/types/common';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import BookmarkButton from '@/components/common/buttons/BookmarkButton';
import Button from '@/components/common/buttons/Button';
import KebabDropdownButton from '@/components/common/buttons/KebabDropdownButton';
import ConditionalRender from '@/components/common/ConditionalRender';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import Profile from '@/components/common/profile/Profile';
import Tag from '@/components/common/Tag';
import DeletePlanModal from '@/components/modals/DeletePlanModal';
import ShareLinkModal from '@/components/modals/ShareLinkModal';
import SubmitModal from '@/components/modals/SubmitModal';
import CalendarSvg from '@/icons/calendar.svg';
import ShareSvg from '@/icons/share.svg';
import DeleteSvg from '@/icons/trash.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useToast from '@/libs/hooks/useToast';

type PlanDetailContentHeaderContentProps = {
  articleId: number;
  planDetail: GetArticleResponse;
  scheduleDetail: ScheduleDetail;
  isEditMode: boolean;
};

const PLAN_DETAIL_DROPDOWN_ID = 'planDetailDropdown';

export default function PlanDetailContentHeaderContent({
  articleId,
  planDetail,
  isEditMode
}: PlanDetailContentHeaderContentProps) {
  const {
    title,
    start_at,
    end_at,
    locations,
    travel_companion,
    travel_styles,
    cover_img_url,
    is_bookmarked,
    is_editable,
    user_id,
    nickname,
    profile_img_url
  } = planDetail;

  const router = useRouter();
  const { openModal, closeModal } = useContextModal();
  const { showToast } = useToast();
  const { closeDropdown } = useContextDropdown<HTMLButtonElement>(PLAN_DETAIL_DROPDOWN_ID);
  const { mutate: patchBookmark } = usePatchLikeArticle();
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);

  // 북마크 토글
  const handleToggleBookmark = () => {
    setIsBookmarkLoading(true);
    patchBookmark(articleId, {
      onSuccess: (res) => {
        setIsBookmarkLoading(false);
        const { data, error } = res.body;
        if (!data || error) {
          const message = translateErrorCode(error?.code);
          showToast(message, 'error');
        }
        const bookmarkStatus = data?.status === 'ACTIVE' ? true : false;
        setIsBookmarked(bookmarkStatus);
      }
    });
  };

  // 링크 공유
  const handleShareButtonClick = () => {
    const locationsHashtag = locations.map((item) => '#' + item.city).join(' ');
    const companionHashtag = '#' + travel_companion;
    const stylesHashtag = travel_styles.map((item) => '#' + item).join(' ');
    const description = locationsHashtag + ' ' + companionHashtag + ' ' + stylesHashtag;
    openModal(
      <ShareLinkModal
        className="h-auto w-full max-w-[20rem] md:max-w-[24rem]"
        title={title}
        description={description}
        imageUrl={cover_img_url}
        onSubmit={() => closeModal()}
      />
    );
  };

  const handleAfterDeletePlan = () => {
    router.replace(APP_URLS.PROFILE(user_id));
  };

  // 여행 계획 삭제
  const handleDeletePlan = () => {
    closeDropdown();
    if (!is_editable) return showToast('권한이 없습니다.', 'error');
    openModal(<DeletePlanModal articleId={articleId} onAfterDeletePlan={handleAfterDeletePlan} />);
  };

  // 여행 계획 편집 페이지로 이동
  const handleEditPlanPage = () => {
    closeDropdown();
    if (!isEditMode) return router.push(APP_URLS.PLAN_EDIT(articleId));
    openModal(
      <SubmitModal
        className="h-auto max-w-[18rem] md:max-w-[24rem]"
        submitText="이동하기"
        onCancel={() => closeModal()}
        onSubmit={() => {
          router.push(APP_URLS.PLAN_EDIT(articleId));
          closeModal();
        }}
      >
        저장하지 않은 일정이 사라집니다.
        <br />
        페이지를 이동하시겠습니까?
      </SubmitModal>
    );
  };

  return (
    <>
      <div className="relative flex w-full flex-col p-5 md:p-7 xl:p-10 xl:pb-5">
        <div className="flex-row-center relative w-full justify-between md:mb-0.5">
          {/* 여행 날짜 */}
          <p className="font-caption-2 md:font-caption-1 text-gray-01">
            {start_at.replace(/-/g, '.')} ~ {end_at.replace(/-/g, '.')}
          </p>
          {/* 공유, 메뉴 버튼 */}
          <div className="flex-row-center gap-4">
            <Button className="size-5 md:size-6" onClick={handleShareButtonClick}>
              <ShareSvg color={COLORS.GRAY_01} />
            </Button>
            <ConditionalRender condition={is_editable}>
              <KebabDropdownButton
                dropdownId={PLAN_DETAIL_DROPDOWN_ID}
                className="size-5 md:size-6"
                dropdownClassName="right-0 top-6"
              >
                <DropdownItem
                  onClick={() => handleEditPlanPage()}
                  icon={<CalendarSvg color={COLORS.BLACK_01} />}
                  text="여행 계획 수정"
                />
                <DropdownItem
                  className="text-red-01"
                  onClick={() => handleDeletePlan()}
                  icon={<DeleteSvg color={COLORS.RED_01} />}
                  text="여행 계획 삭제"
                />
              </KebabDropdownButton>
            </ConditionalRender>
          </div>
        </div>
        {/* 여행 타이틀 */}
        <div className="font-title-3 md:font-title-2 mb-2 md:mb-3">
          <span className="mr-2 md:mr-3">{title}</span>
          <ConditionalRender condition={!is_editable}>
            <BookmarkButton
              containerClassName="inline-flex"
              className="size-5 pt-px md:size-6"
              onClick={handleToggleBookmark}
              isLoading={isBookmarkLoading}
              isBookmarked={isBookmarked}
            />
          </ConditionalRender>
        </div>
        {/* 작성자 프로필 */}
        <Link href={APP_URLS.PROFILE(user_id)} className="mb-4 w-fit md:mb-5">
          <Profile nickname={nickname} src={profile_img_url} alt="writer-profile" />
        </Link>
        {/* 여행 태그 */}
        <div>
          {locations.map((location) => (
            <Tag className="inline-block" key={location.place_id} type="location" text={location.city} />
          ))}
          <Tag className="inline-block bg-secondary-02 text-secondary-01" type="other" text={travel_companion} />
          {travel_styles.map((style) => (
            <Tag className="inline-block bg-secondary-02 text-secondary-01" key={style} type="other" text={style} />
          ))}
        </div>
      </div>
      <div className="mx-10 hidden border-b border-gray-02 xl:block" />
    </>
  );
}
