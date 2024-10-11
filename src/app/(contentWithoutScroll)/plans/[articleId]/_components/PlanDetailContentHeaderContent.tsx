import { useRouter } from 'next/navigation';

import { GetArticleResponse } from '@/apis/services/article/reader/type';
import { usePatchDeleteScheduleList } from '@/apis/services/articleSchedule/writer/useService';
import { ScheduleDetail } from '@/apis/types/common';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import { DropdownListMenu } from '@/components/common/dropdowns/type';
import Tag from '@/components/common/Tag';
import ShareLinkModal from '@/components/modals/ShareLinkModal';
import SubmitModal from '@/components/modals/SubmitModal';
import CalendarSvg from '@/icons/calendar.svg';
import EditSvg from '@/icons/edit.svg';
import KebabSvg from '@/icons/kebab.svg';
import ShareSvg from '@/icons/share.svg';
import DeleteSvg from '@/icons/trash.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useToast from '@/libs/hooks/useToast';

const PLAN_DETAIL_DROPDOWN_ID = 'planDetailDropdown';

type DropdownList = '여행 계획 수정' | '일정 편집하기' | '여행 계획 삭제';
const DROPDOWN_LIST: DropdownListMenu<DropdownList>[] = [
  { icon: <CalendarSvg color={COLORS.BLACK_01} />, text: '여행 계획 수정' },
  { icon: <EditSvg color={COLORS.BLACK_01} />, text: '일정 편집하기' },
  { icon: <DeleteSvg color={COLORS.RED_01} />, text: '여행 계획 삭제' }
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
      >
        일정을 삭제하시겠습니까?
      </SubmitModal>
    );
  };

  // 여행 계획 편집 페이지로 이동
  const handleEditPlanPage = () => {
    if (!isEditMode) return router.push(APP_URLS.PLAN_EDIT(articleId));
    openModal(
      <SubmitModal
        className="h-auto max-w-[20rem] md:max-w-[24rem]"
        submitText="이동하기"
        onCancel={() => closeModal()}
        onSubmit={() => {
          router.push(APP_URLS.PLAN_EDIT(articleId));
          closeModal();
        }}
      >
        저장하지 않은 변경 사항이 사라집니다. <br />
        페이지를 이동하시겠습니까?
      </SubmitModal>
    );
  };

  // 드롭다운 선택
  const handleDropdownSelect = (text: DropdownList) => {
    closeDropdown();

    switch (text) {
      case '여행 계획 수정':
        handleEditPlanPage();
        break;
      case '일정 편집하기':
        handleSetEditMode();
        break;
      case '여행 계획 삭제':
        handleDeletePlan();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="relative w-full p-5 md:p-7 xl:p-10 xl:pb-5">
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
            <Button
              className={`size-5 md:size-6 ${!scheduleDetail.is_editable && !scheduleDetail.review_id && 'hidden'}`}
              onClick={() => toggleDropdown(PLAN_DETAIL_DROPDOWN_ID)}
              ref={containerRef}
            >
              <KebabSvg color={COLORS.GRAY_01} />
            </Button>
          </div>
          <Dropdown id={PLAN_DETAIL_DROPDOWN_ID} className="right-0 top-6" ref={dropdownRef}>
            {DROPDOWN_LIST.map((item) => {
              const { text } = item;
              if (
                !scheduleDetail.is_editable &&
                (text === '여행 계획 수정' || text === '일정 편집하기' || text === '여행 계획 삭제')
              )
                return;
              if (text === '일정 편집하기' && isEditMode) return;
              return (
                <DropdownItem
                  className={`${text === '여행 계획 삭제' && 'text-red-01'}`}
                  key={text}
                  onClick={() => handleDropdownSelect(text)}
                  {...item}
                />
              );
            })}
          </Dropdown>
        </div>
        {/* 여행 타이틀 */}
        <p className="font-title-3 md:font-title-2 mb-2.5 md:mb-3.5">{title}</p>
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
