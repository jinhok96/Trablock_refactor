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
import { PlanCardShape } from '@/libs/contexts/PlanCardShapeContext';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';
import useContextUserData from '@/libs/hooks/useContextUserData';
import useToast from '@/libs/hooks/useToast';
import { formatDate } from '@/libs/utils/formatDate';

type DropdownList = '여행 계획 삭제';

export type PlanCardProps = {
  article: Article;
  className?: string;
  isEditable?: boolean;
  priority?: boolean;
  hideBookmark?: boolean;
  forceShape?: PlanCardShape;
};

const PLAN_CARD_DROPDOWN_ID = 'planCard';

const DROPDOWN_LIST: Array<{ icon: ReactNode; text: DropdownList }> = [
  { icon: <DeleteSvg color={COLORS.RED_01} />, text: '여행 계획 삭제' }
];

export default function PlanCard({
  article,
  className,
  isEditable,
  priority,
  hideBookmark,
  forceShape
}: PlanCardProps) {
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
  const { shape: contextShape } = useContextPlanCardShape();
  const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(bookmark_count);
  const { mutate: patchDeletePlan, isPending: patchDeletePlanLoading } = usePatchDeleteScheduleList(article_id);
  const { mutate: patchBookmarkArticle } = usePatchLikeArticle();

  // >>> api에 userId 추가되면 userId를 비교하는 로직으로 변경
  const { userData: myProfile } = useContextUserData();
  const isMyPlanCard = name === myProfile?.name && profile_img_url === myProfile?.profile_img_url;
  // <<<

  const shape = forceShape || contextShape;

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
        setBookmarkCount(bookmarkStatus ? bookmarkCount + 1 : bookmarkCount - 1);
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
      className={`absolute right-3 top-3 w-fit rounded-md bg-white-01 p-1.5 shadow-button hover:bg-gray-02 md:right-4 md:top-4 md:p-2 ${(isMyPlanCard || hideBookmark) && 'hidden'}`}
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
      className="aspect-video max-h-48 w-full flex-1 border-b border-gray-03"
      src={cover_img_url || EXTERNAL_URLS.PLAN_DETAIL_DEFAULT_COVER_IMAGE}
      width={710}
      height={192}
      alt={`plan-card-${article_id}`}
      priority={priority}
    />
  );

  const BarCoverImageComponent = (
    <NextImage
      className="aspect-video w-full max-w-60 border-r border-gray-03"
      src={cover_img_url || EXTERNAL_URLS.PLAN_DETAIL_DEFAULT_COVER_IMAGE}
      width={240}
      height={300}
      alt={`plan-card-${article_id}`}
      priority={priority}
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
        <p className={`font-subtitle-1 mb-2 line-clamp-1 ${shape === 'bar' && 'mr-12'}`}>{title}</p>
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
        <div className={`flex-row-center gap-1 ${hideBookmark && 'hidden'}`}>
          <div className="size-3">
            <BookmarkSvg color={COLORS.GRAY_01} stroke={COLORS.GRAY_01} />
          </div>
          <span className="font-caption-3 text-gray-01">{bookmarkCount}</span>
        </div>
      </div>
    </div>
  );

  const CardComponent = (
    <div className={`flex-col-center size-full overflow-hidden rounded-xl bg-white-01 shadow-button ${className}`}>
      <Link className="size-full" href={APP_URLS.PLAN_DETAIL(article_id)}>
        <div className="flex-col-center relative size-full">
          {/* 커버 이미지 */}
          {CardCoverImageComponent}
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
          {BarCoverImageComponent}
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
