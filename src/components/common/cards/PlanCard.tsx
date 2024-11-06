import { MouseEvent, MouseEventHandler, ReactNode, useState } from 'react';

import Link from 'next/link';

import { usePatchLikeArticle } from '@/apis/services/article/like/useService';
import { Article } from '@/apis/services/article/reader/type';
import { usePatchDeleteScheduleList } from '@/apis/services/articleSchedule/writer/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import NextImage from '@/components/common/NextImage';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import Tag from '@/components/common/Tag';
import SubmitModal from '@/components/modals/SubmitModal';
import BookmarkSvg from '@/icons/bookmark.svg';
import CalendarSvg from '@/icons/calendar.svg';
import KebabSvg from '@/icons/kebab.svg';
import DeleteSvg from '@/icons/trash.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import { EXTERNAL_URLS } from '@/libs/constants/externalUrls';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';
import useContextUserData from '@/libs/hooks/useContextUserData';
import useResize from '@/libs/hooks/useResize';
import useToast from '@/libs/hooks/useToast';
import { formatDate } from '@/libs/utils/formatDate';

const PLAN_CARD_DROPDOWN_ID = 'planCard';

type DropdownList = '여행 계획 삭제';
const DROPDOWN_LIST: Array<{ icon: ReactNode; text: DropdownList }> = [
  { icon: <DeleteSvg color={COLORS.RED_01} />, text: '여행 계획 삭제' }
];

type PlanCard = {
  article: Article;
  className?: string;
  isEditable?: boolean;
  priority?: boolean;
  isCardShape: boolean;
};

export default function PlanCard({ article, className, isEditable, priority, isCardShape }: PlanCard) {
  const {
    article_id,
    title,
    locations,
    start_at,
    end_at,
    cover_img_url,
    travel_companion,
    travel_styles,
    name,
    profile_img_url,
    bookmark_count,
    is_bookmarked,
    is_editable
  } = article;

  const dropdownId = `${PLAN_CARD_DROPDOWN_ID}-${article_id}`;

  const { showToast } = useToast();
  const { openModal, closeModal } = useContextModal();
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown } =
    useContextDropdown<HTMLButtonElement>(dropdownId);
  const { shape } = useContextPlanCardShape();
  const { mutate: patchDeletePlan, isPending: patchDeletePlanLoading } = usePatchDeleteScheduleList(article_id);
  const { divRef: barDivRef, divHeight: barDivHeight } = useResize();
  const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);
  const { mutate: patchBookmarkArticle } = usePatchLikeArticle();

  // >>> api에 userId 추가되면 userId를 비교하는 로직으로 변경
  const { userData: myProfile } = useContextUserData();
  const isMyPlanCard = name === myProfile?.name && profile_img_url === myProfile?.profile_img_url;
  // <<<

  const startAt = formatDate(new Date(start_at), { yearFormat: 'yyyy', monthFormat: 'm', dayFormat: 'd', parser: '.' });
  const endAt = formatDate(new Date(end_at), { yearFormat: 'yyyy', monthFormat: 'm', dayFormat: 'd', parser: '.' });

  const handleToggleBookmark: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    patchBookmarkArticle(article_id, {
      onSuccess: (res) => {
        const { data, error } = res.body;
        if (!data || error) {
          const message = translateErrorCode(error?.code);
          return showToast(message, 'error');
        }
        const bookmarkStatus = data.status === 'ACTIVE' ? true : false;
        setIsBookmarked(bookmarkStatus);
      }
    });
  };

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

  const handleDropdownSelect = (e: MouseEvent, text: DropdownList) => {
    e.preventDefault();
    closeDropdown();
    switch (text) {
      case '여행 계획 삭제':
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
        break;
      default:
        break;
    }
  };

  const BookmarkComponent = (
    <Button
      className={`absolute top-3 w-fit rounded-md bg-white-01 p-1.5 shadow-button hover:bg-gray-02 md:top-4 md:p-2 ${isCardShape ? 'right-3 md:right-4' : 'left-3 top-3 md:left-4 md:top-4'} ${isMyPlanCard && 'hidden'}`}
      onClick={handleToggleBookmark}
    >
      <div className="size-[1.125rem] md:size-5">
        <div className={`${!isBookmarked && 'hidden'}`}>
          <BookmarkSvg color={COLORS.POINT} stroke={COLORS.POINT} />
        </div>
        <div className={`${isBookmarked && 'hidden'}`}>
          <BookmarkSvg color="transparent" stroke={COLORS.GRAY_01} />
        </div>
      </div>
    </Button>
  );

  const CardCoverImageComponent = (
    <NextImage
      className="aspect-video w-full flex-1 border-b border-gray-03"
      src={cover_img_url || EXTERNAL_URLS.PLAN_DETAIL_DEFAULT_COVER_IMAGE}
      width={710}
      height={280}
      alt={`plan-card-${article_id}`}
      priority={priority}
    />
  );

  const BarCoverImageComponent = (
    <NextImage
      className="w-full flex-1 border-r border-gray-03"
      src={cover_img_url || EXTERNAL_URLS.PLAN_DETAIL_DEFAULT_COVER_IMAGE}
      width={320}
      height={260}
      alt={`plan-card-${article_id}`}
      priority={priority}
      style={{
        maxHeight: barDivHeight ? `${barDivHeight}px` : '100%'
      }}
    />
  );

  const DropdownComponent = isEditable && (
    <>
      <Button
        className={`absolute right-3 top-3 md:right-4 md:top-4 ${!is_editable && 'hidden'}`}
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown(dropdownId);
        }}
        ref={containerRef}
      >
        <KebabSvg width={24} height={24} color={COLORS.GRAY_01} />
      </Button>
      <Dropdown id={dropdownId} className="right-3 top-9 md:right-6 md:top-10" ref={dropdownRef}>
        {DROPDOWN_LIST.map((item) => {
          const { text } = item;
          return (
            <DropdownItem
              key={text}
              className={`${text === '여행 계획 삭제' && 'text-red-01'}`}
              onClick={(e) => handleDropdownSelect(e, text)}
              {...item}
            />
          );
        })}
      </Dropdown>
    </>
  );

  const PlanInfoComponent = (
    <div className="flex size-full flex-col justify-between">
      <div className="p-3 !pb-0 md:p-4">
        {/* 타이틀 */}
        <p className="font-subtitle-1 mb-2 mt-0.5 line-clamp-1 md:mt-0">{title}</p>
        {/* 기간 */}
        <div className="flex-row-center mb-4 gap-1.5">
          <CalendarSvg color={COLORS.GRAY_01} strokeWidth={2} width={16} height={16} />
          <span className="font-subtitle-3 !font-semibold text-gray-01">
            {startAt} ~ {endAt}
          </span>
        </div>
        {/* 태그 */}
        <div className="mb-3.5">
          {locations.map((location) => (
            <Tag className="inline-block" key={location.place_id} type="location" text={location.city} />
          ))}
          <Tag className="inline-block bg-secondary-02 text-secondary-01" type="other" text={travel_companion} />
          {travel_styles.map((style) => (
            <Tag className="inline-block bg-secondary-02 text-secondary-01" key={style} type="other" text={style} />
          ))}
        </div>
      </div>
      {/* 프로필, 북마크 카운트 */}
      <div className="flex-row-center justify-between border-t border-gray-03 p-3 md:p-4">
        <div className="flex-row-center gap-2">
          <ProfileImage className="size-8" src={profile_img_url} alt="writer" width={32} height={32} />
          <span className="font-caption-2">{name}</span>
        </div>
        <div className="flex-row-center gap-1">
          <div className="size-3">
            <BookmarkSvg color={COLORS.GRAY_01} stroke={COLORS.GRAY_01} />
          </div>
          <span className="font-caption-3 text-gray-01">{bookmark_count}</span>
        </div>
      </div>
    </div>
  );

  if (!shape) return;

  if (isCardShape)
    return (
      <Link href={APP_URLS.PLAN_DETAIL(article_id)}>
        <div className={`flex-col-center size-full overflow-hidden rounded-xl shadow-button ${className}`}>
          <div className="flex-col-center relative w-full grow">
            {/* 북마크 버튼 */}
            {BookmarkComponent}
            {/* 커버 이미지 */}
            {CardCoverImageComponent}
            <div className="relative w-full flex-1">
              {/* 드롭다운 */}
              {DropdownComponent}
              {/* 타이틀, 기간, 태그, 작성자, 북마크 카운트 */}
              {PlanInfoComponent}
            </div>
          </div>
        </div>
      </Link>
    );

  return (
    <div className={`w-full overflow-hidden rounded-xl shadow-button ${className}`}>
      <Link href={APP_URLS.PLAN_DETAIL(article_id)}>
        <div className="relative flex">
          {/* 북마크 버튼 */}
          {BookmarkComponent}
          {/* 커버 이미지 */}
          {BarCoverImageComponent}
          <div className="relative w-full flex-2" ref={barDivRef}>
            {/* 드롭다운 */}
            {DropdownComponent}
            {/* 타이틀, 기간, 태그, 작성자, 북마크 카운트 */}
            {PlanInfoComponent}
          </div>
        </div>
      </Link>
    </div>
  );
}
