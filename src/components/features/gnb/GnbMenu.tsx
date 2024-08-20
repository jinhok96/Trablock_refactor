'use client';

import Link from 'next/link';

import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import AuthButton from '@/components/features/gnb/AuthButton';
import CalendarAddSvg from '@/icons/calendar-add.svg';
import SearchSvg from '@/icons/search.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';

type GnbMenuProps = {
  userProfile?: (Pick<GetUserProfileResponse, 'name' | 'profile_img_url'> & { userId?: number }) | null;
};

export default function GnbMenu({ userProfile }: GnbMenuProps) {
  return (
    <div className="flex-row-center gap-4 md:gap-6">
      {/* 모바일 전용 / 이거 클릭하면 전체 화면 모달 띄우기 / 검색 기능 */}
      <SearchSvg
        className={`size-[1.375rem] cursor-pointer md:hidden`}
        stroke={COLORS.BLACK_01}
        strokeWidth="1"
        onClick={() => console.log('서치 클릭')}
      />
      <Link href={APP_URLS.PLAN_CREATE}>
        <CalendarAddSvg className="size-[1.375rem] cursor-pointer md:size-7" color={COLORS.BLACK_01} />
      </Link>
      <AuthButton userProfile={userProfile} />
    </div>
  );
}
