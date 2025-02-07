import { MouseEvent } from 'react';

import Button from '@/components/common/buttons/Button';
import { PlanCardArticle } from '@/components/common/cards/type';
import ConditionalRender from '@/components/common/ConditionalRender';
import Profile from '@/components/common/profile/Profile';
import Tag from '@/components/common/Tag';
import BookmarkSvg from '@/icons/bookmark.svg';
import CalendarSvg from '@/icons/calendar.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useRouter from '@/libs/hooks/useRouter';
import { formatDate } from '@/libs/utils/formatDate';

export type PlanCardInfoProps = {
  article: PlanCardArticle;
  hideBookmark?: boolean;
  bookmarkCount?: number;
};

export default function PlanCardInfo({ article, hideBookmark, bookmarkCount }: PlanCardInfoProps) {
  const { user_id, title, start_at, end_at, locations, travel_companion, travel_styles, nickname, profile_img_url } =
    article;

  const router = useRouter();

  const startAt = formatDate(new Date(start_at), { yearFormat: 'yyyy', monthFormat: 'm', dayFormat: 'd', parser: '.' });
  const endAt = formatDate(new Date(end_at), { yearFormat: 'yyyy', monthFormat: 'm', dayFormat: 'd', parser: '.' });

  const handleProfileClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(APP_URLS.PROFILE(user_id));
  };

  return (
    <div className="flex size-full flex-col justify-between">
      <div className="p-3 !pb-0 md:p-4">
        {/* 타이틀 */}
        <p className={`font-subtitle-1 mb-2 mr-10 line-clamp-1`}>{title}</p>
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
        <Button onClick={handleProfileClick}>
          <Profile nickname={nickname} src={profile_img_url} alt="writer-profile" />
        </Button>
        <ConditionalRender condition={!hideBookmark}>
          <div className="flex-row-center gap-1">
            <div className="size-3">
              <BookmarkSvg color={COLORS.GRAY_01} stroke={COLORS.GRAY_01} />
            </div>
            <span className="font-caption-3 text-gray-01">{bookmarkCount}</span>
          </div>
        </ConditionalRender>
      </div>
    </div>
  );
}
