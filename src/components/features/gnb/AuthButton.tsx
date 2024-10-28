'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HEADERS } from '@/apis/constants/headers';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { handleDeleteCookie } from '@/app/actions/cookieActions';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import { DropdownListMenu } from '@/components/common/dropdowns/type';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import DefaultProfileSvg from '@/icons/default-profile.svg?url';
import LogoutSvg from '@/icons/logout.svg';
import ProfileSvg from '@/icons/profile.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';

const GNB_AUTH_BUTTON_DROPDOWN_ID = 'gnbAuthButtonDropdown';

type DropdownList = '내 프로필' | '로그아웃';
const DROPDOWN_LIST: DropdownListMenu<DropdownList>[] = [
  { icon: <ProfileSvg color={COLORS.BLACK_01} />, text: '내 프로필' },
  { icon: <LogoutSvg color={COLORS.RED_01} />, text: '로그아웃' }
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
        <ProfileImage
          className={`size-7 md:size-8`}
          src={userProfile.profile_img_url || DefaultProfileSvg}
          alt="profile"
          width={36}
          height={36}
          priority
        />
        <span className="font-caption-1 max-md:hidden">{userProfile.name}</span>
      </Button>
      <Dropdown id={GNB_AUTH_BUTTON_DROPDOWN_ID} className="right-0 top-10 md:top-[3.25rem]" ref={dropdownRef}>
        {DROPDOWN_LIST.map((item) => {
          const { text } = item;
          return (
            <DropdownItem
              className={`${text === '로그아웃' && 'text-red-01'}`}
              key={text}
              onClick={() => handleDropdownSelect(text)}
              {...item}
            />
          );
        })}
      </Dropdown>
    </>
  );
}
