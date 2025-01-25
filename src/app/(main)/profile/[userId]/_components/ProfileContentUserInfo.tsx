import { useState } from 'react';

import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import ProfileContentUserInfoForm from '@/app/(main)/profile/[userId]/_components/ProfileContentUserInfoForm';
import UserUnregistrationModal from '@/app/(main)/profile/[userId]/_components/UserUnregistrationModal';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import { DropdownListMenu } from '@/components/common/dropdowns/type';
import ProfileImage from '@/components/common/profile/ProfileImage';
import EditSvg from '@/icons/edit.svg';
import KebabSvg from '@/icons/kebab.svg';
import DeleteSvg from '@/icons/trash.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';

type DropdownList = '프로필 수정' | '계정 삭제';

type ProfileContentUserInfo = {
  className?: string;
  userProfileData: GetUserProfileResponse;
};

const USER_PROFILE_DROPDOWN_ID = 'planDetailDropdown';

const DROPDOWN_LIST: Array<DropdownListMenu<DropdownList>> = [
  { icon: <EditSvg color={COLORS.BLACK_01} />, text: '프로필 수정' },
  { icon: <DeleteSvg color={COLORS.RED_01} />, text: '계정 삭제' }
];

export default function ProfileContentUserInfo({ className, userProfileData }: ProfileContentUserInfo) {
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown } =
    useContextDropdown<HTMLButtonElement>(USER_PROFILE_DROPDOWN_ID);
  const { openModal, closeModal } = useContextModal();
  const [isEditMode, setIsEditMode] = useState(false);

  const { introduce, is_editable, name, profile_img_url } = userProfileData;

  const handleEnableEditMode = () => {
    setIsEditMode(true);
  };

  const handleFinishUserProfileEdit = () => {
    setIsEditMode(false);
  };

  const handleDeleteUser = () => {
    openModal(<UserUnregistrationModal nickname={name} onRequestClose={closeModal} />);
  };

  const handleDropdownSelect = (text?: DropdownList) => {
    closeDropdown();
    switch (text) {
      case '프로필 수정':
        handleEnableEditMode();
        break;
      case '계정 삭제':
        handleDeleteUser();
        break;
      default:
        break;
    }
  };

  if (isEditMode)
    return (
      <ProfileContentUserInfoForm
        className={className}
        userProfileData={userProfileData}
        handleFinishUserProfileEdit={handleFinishUserProfileEdit}
      />
    );

  return (
    <div className={`flex-row-center xl:flex-col-center ${className}`}>
      <div
        className={`relative mr-4 size-20 shrink-0 overflow-hidden rounded-full md:mr-6 md:size-[7.5rem] xl:mb-6 xl:mr-0 xl:size-40 ${!profile_img_url && 'border border-gray-02'}`}
      >
        <ProfileImage className="size-full" sizes={176} alt="profile" src={profile_img_url} priority />
      </div>
      <div className="mt-1 xl:mx-5 xl:mt-0 xl:text-center">
        <p className="font-subtitle-1 mb-2 leading-none md:mb-2.5">{name}</p>
        <p className="break-all leading-snug text-black-03">{introduce || '한 줄 소개가 없습니다.'}</p>
      </div>
      <Button
        className={`absolute right-5 top-5 md:right-6 md:top-6 ${!is_editable && 'hidden'}`}
        onClick={() => toggleDropdown(USER_PROFILE_DROPDOWN_ID)}
        ref={containerRef}
      >
        <KebabSvg width={24} height={24} color={COLORS.GRAY_01} />
      </Button>
      <Dropdown id={USER_PROFILE_DROPDOWN_ID} className="right-0 top-12 md:right-6" ref={dropdownRef}>
        {DROPDOWN_LIST.map((item) => {
          const { text } = item;
          return (
            <DropdownItem
              key={text}
              className={`${text === '계정 삭제' && 'text-red-01'}`}
              onClick={() => handleDropdownSelect(text)}
              {...item}
            />
          );
        })}
      </Dropdown>
    </div>
  );
}
