'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HEADERS } from '@/apis/constants/headers';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { handleDeleteCookie } from '@/app/actions/cookieActions';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import NextImage from '@/components/common/NextImage';
import DefaultProfileSvg from '@/icons/default-profile.svg?url';
import LogoutSvg from '@/icons/logout.svg';
import ProfileSvg from '@/icons/profile.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';

const GNB_AUTH_BUTTON_DROPDOWN_ID = 'gnbAuthButtonDropdown';

type DropdownList = '내 프로필' | '로그아웃';
const DROPDOWN_LIST: Array<{ icon: ReactNode; text: DropdownList }> = [
  { icon: <ProfileSvg width={16} height={16} color={COLORS.BLACK_01} />, text: '내 프로필' },
  { icon: <LogoutSvg width={16} height={16} color={COLORS.RED_01} />, text: '로그아웃' }
];

export type AuthButtonProps = {
  userProfile?: (Pick<GetUserProfileResponse, 'name' | 'profile_img_url'> & { userId?: number }) | null;
};

export default function AuthButton({ userProfile }: AuthButtonProps) {
  const router = useRouter();
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown } =
    useContextDropdown<HTMLButtonElement>(GNB_AUTH_BUTTON_DROPDOWN_ID);

  const handleDropdownSelect = async (text: DropdownList) => {
    closeDropdown();

    switch (text) {
      case '내 프로필':
        if (!userProfile?.userId) break;
        router.push(APP_URLS.PROFILE(userProfile.userId));
        break;
      case '로그아웃':
        await handleDeleteCookie(HEADERS.AUTHORIZATION_TOKEN);
        await handleDeleteCookie(HEADERS.REFRESH_TOKEN);
        await handleDeleteCookie(HEADERS.AUTO_LOGIN);
        router.refresh();
        break;
      default:
        break;
    }
  };

  if (!userProfile || !userProfile.userId) {
    return (
      <Link href={APP_URLS.LOGIN}>
        <span className="btn-sm md:btn-md cursor-pointer text-primary-01">로그인</span>
      </Link>
    );
  }

  return (
    <>
      <Button className="gap-1.5" onClick={() => toggleDropdown(GNB_AUTH_BUTTON_DROPDOWN_ID)} ref={containerRef}>
        <NextImage
          className="size-7 rounded-full border border-gray-02 md:size-8"
          src={userProfile.profile_img_url || DefaultProfileSvg}
          alt="profile"
          width={36}
          height={36}
          priority
        />
        <span className="font-caption-1 max-md:hidden">{userProfile.name}</span>
      </Button>
      <Dropdown
        id={GNB_AUTH_BUTTON_DROPDOWN_ID}
        className="right-4 top-10 md:right-6 md:top-[3.25rem] xl:right-9"
        ref={dropdownRef}
      >
        {DROPDOWN_LIST.map((item) => {
          const { icon, text } = item;
          return (
            <DropdownItem
              className="flex-row-center !justify-start gap-1.5"
              key={text}
              onClick={() => handleDropdownSelect(text)}
            >
              {icon}
              <span className={`font-btn-text mr-1.5 ${text === '로그아웃' && 'text-red-01'}`}>{text}</span>
            </DropdownItem>
          );
        })}
      </Dropdown>
    </>
  );
}
