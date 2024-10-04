import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { GetArticleResponse } from '@/apis/services/article/reader/type';
import { usePatchDeleteScheduleList } from '@/apis/services/articleSchedule/writer/useService';
import { ScheduleDetail } from '@/apis/types/common';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import Tag from '@/components/common/Tag';
import ShareLinkModal from '@/components/modals/ShareLinkModal';
import SubmitModal from '@/components/modals/SubmitModal';
import CalendarSvg from '@/icons/calendar.svg';
import EditSvg from '@/icons/edit.svg';
import KebabSvg from '@/icons/kebab.svg';
import ReviewSvg from '@/icons/review.svg';
import ShareSvg from '@/icons/share.svg';
import DeleteSvg from '@/icons/trash.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useToast from '@/libs/hooks/useToast';

const PLAN_DETAIL_DROPDOWN_ID = 'planDetailDropdown';

type DropdownList = '여행 계획 수정' | '일정 편집하기' | '후기 작성하기' | '후기 보러가기' | '여행 계획 삭제';
const DROPDOWN_LIST: Array<{ icon: ReactNode; text: DropdownList }> = [
  { icon: <CalendarSvg width={16} height={16} color={COLORS.BLACK_01} />, text: '여행 계획 수정' },
  { icon: <EditSvg width={16} height={16} color={COLORS.BLACK_01} />, text: '일정 편집하기' },
  { icon: <ReviewSvg width={16} height={16} color={COLORS.BLACK_01} />, text: '후기 작성하기' },
  { icon: <ReviewSvg width={16} height={16} color={COLORS.BLACK_01} />, text: '후기 보러가기' },
  { icon: <DeleteSvg width={16} height={16} color={COLORS.RED_01} />, text: '여행 계획 삭제' }
];

type PlanDetailContentHeaderContentProps = {
  articleId: number;
  planDetail: GetArticleResponse;
  scheduleDetail: ScheduleDetail;
  isEditMode: boolean;
  handleSetEditMode: () => void;
};

export default function PlanDetailContentHeaderContent({
  articleId,
  planDetail,
  scheduleDetail,
  isEditMode,
  handleSetEditMode
}: PlanDetailContentHeaderContentProps) {
  const router = useRouter();
  const { openModal, closeModal } = useContextModal();
  const { showToast } = useToast();
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown } =
    useContextDropdown<HTMLButtonElement>(PLAN_DETAIL_DROPDOWN_ID);
  const { mutate: deleteScheduleList } = usePatchDeleteScheduleList(articleId);

  const { title, start_at, end_at, locations, travel_companion, travel_styles, cover_img_url } = planDetail;

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

  // 여행 계획 삭제
  const handleDeletePlan = () => {
    openModal(
      <SubmitModal
        className="h-auto w-full max-w-[20rem] md:max-w-[24rem]"
        text="일정을 삭제하시겠습니까?"
        submitText="삭제하기"
        negative
        onCancel={() => closeModal()}
        onSubmit={() => {
          deleteScheduleList(undefined, {
            onSuccess: (res) => {
              const { data, error } = res.body;
              if (!data || error) return showToast(translateErrorCode(error?.code), 'error');
              showToast('여행 계획 삭제 성공!', 'success');
              router.push(APP_URLS.HOME);
            }
          });
          closeModal();
        }}
      />
    );
  };

  // 여행 계획 편집 페이지로 이동
  const handleEditPlanPage = () => {
    if (!isEditMode) return router.push(APP_URLS.PLAN_EDIT(articleId));
    openModal(
      <SubmitModal
        className="h-auto max-w-[20rem] md:max-w-[24rem]"
        text={`저장되지 않은 변경 사항이 사라집니다. 페이지를 이동하시겠습니까?`}
        submitText="이동하기"
        onCancel={() => closeModal()}
        onSubmit={() => {
          router.push(APP_URLS.PLAN_EDIT(articleId));
          closeModal();
        }}
      />
    );
  };

  // 드롭다운 선택
  const handleDropdownSelect = (text: DropdownList) => {
    closeDropdown();

    if (text === '여행 계획 수정') {
      handleEditPlanPage();
    }

    if (text === '일정 편집하기') {
      handleSetEditMode();
    }

    if (text === '후기 작성하기') {
      router.push(APP_URLS.REVIEW_CREATE(articleId));
    }

    if (text === '후기 보러가기') {
      if (!scheduleDetail.review_id) return;
      router.push(APP_URLS.REVIEW_DETAIL(scheduleDetail.review_id));
    }

    if (text === '여행 계획 삭제') {
      handleDeletePlan();
    }
  };

  return (
    <>
      <div className="relative w-full p-5 md:p-7 xl:p-10 xl:pb-5">
        <div className="flex-row-center relative mb-1 w-full justify-between">
          {/* 여행 날짜 */}
          <p className="font-caption-1 text-gray-01">
            {start_at.replace(/-/g, '.')} ~ {end_at.replace(/-/g, '.')}
          </p>
          {/* 공유, 메뉴 버튼 */}
          <div className="flex-row-center gap-4">
            <Button onClick={handleShareButtonClick}>
              <ShareSvg width={24} height={24} color={COLORS.GRAY_01} />
            </Button>
            <Button
              className={`${!scheduleDetail.is_editable && !scheduleDetail.review_id && 'hidden'}`}
              onClick={() => toggleDropdown(PLAN_DETAIL_DROPDOWN_ID)}
              ref={containerRef}
            >
              <KebabSvg width={24} height={24} color={COLORS.GRAY_01} />
            </Button>
          </div>
          <Dropdown id={PLAN_DETAIL_DROPDOWN_ID} className="right-0 top-6" ref={dropdownRef}>
            {DROPDOWN_LIST.map((item) => {
              const { icon, text } = item;
              if (
                !scheduleDetail.is_editable &&
                (text === '여행 계획 수정' ||
                  text === '일정 편집하기' ||
                  text === '후기 작성하기' ||
                  text === '여행 계획 삭제')
              )
                return;
              if (text === '일정 편집하기' && isEditMode) return;
              if (text === '후기 작성하기' && (scheduleDetail.review_id || scheduleDetail.schedules.length === 0))
                return;
              if (text === '후기 보러가기' && !scheduleDetail.review_id) return;
              return (
                <DropdownItem
                  className="flex-row-center !justify-start gap-1.5"
                  key={text}
                  onClick={() => handleDropdownSelect(text)}
                >
                  {icon}
                  <span className={`font-btn-text mr-1.5 ${text === '여행 계획 삭제' && 'text-red-01'}`}>{text}</span>
                </DropdownItem>
              );
            })}
          </Dropdown>
        </div>
        {/* 여행 타이틀 */}
        <p className="font-title-2 mb-2">{title}</p>
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
