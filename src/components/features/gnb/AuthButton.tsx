import Link from 'next/link';

import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import Profile from '@/components/common/profile/Profile';
import LogoutSvg from '@/icons/logout.svg';
import ProfileSvg from '@/icons/profile.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextUserData from '@/libs/hooks/useContextUserData';
import useRouter from '@/libs/hooks/useRouter';

const GNB_AUTH_BUTTON_DROPDOWN_ID = 'gnbAuthButtonDropdown';

export default function AuthButton() {
  const router = useRouter();
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown } =
    useContextDropdown<HTMLButtonElement>(GNB_AUTH_BUTTON_DROPDOWN_ID);
  const { userData, logout } = useContextUserData();

  const handlePushProfilePage = () => {
    closeDropdown();
    if (!userData?.userId) return;
    router.push(APP_URLS.PROFILE(userData.userId));
  };

  const handleLogout = async () => {
    closeDropdown();
    await logout();
    router.hardRefresh();
  };

  if (!userData) {
    return (
      <Link href={APP_URLS.LOGIN}>
        <span className="btn-sm md:btn-md cursor-pointer text-primary-01">로그인</span>
      </Link>
    );
  }

  return (
    <>
      <Button onClick={() => toggleDropdown(GNB_AUTH_BUTTON_DROPDOWN_ID)} ref={containerRef}>
        <div className="flex-row-center shrink-0 gap-1.5">
          <Profile
            nickname={userData.name}
            src={userData.profile_img_url}
            alt="user-profile"
            textClassName="max-md:hidden"
          />
        </div>
      </Button>
      <Dropdown id={GNB_AUTH_BUTTON_DROPDOWN_ID} className="right-0 top-10 md:top-[3.25rem]" ref={dropdownRef}>
        <DropdownItem
          onClick={() => handlePushProfilePage()}
          icon={<ProfileSvg color={COLORS.BLACK_01} />}
          text="내 프로필"
        />
        <DropdownItem
          className="text-red-01"
          onClick={() => handleLogout()}
          icon={<LogoutSvg color={COLORS.RED_01} />}
          text="로그아웃"
        />
      </Dropdown>
    </>
  );
}
