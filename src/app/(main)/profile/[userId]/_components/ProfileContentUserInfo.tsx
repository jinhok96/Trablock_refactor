import { useState } from 'react';

import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import ProfileContentUserInfoForm from '@/app/(main)/profile/[userId]/_components/ProfileContentUserInfoForm';
import UserUnregistrationModal from '@/app/(main)/profile/[userId]/_components/UserUnregistrationModal';
import KebabDropdownButton from '@/components/common/buttons/KebabDropdownButton';
import ConditionalRender from '@/components/common/ConditionalRender';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import ProfileImage from '@/components/common/profile/ProfileImage';
import EditSvg from '@/icons/edit.svg';
import DeleteSvg from '@/icons/trash.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import useContextModal from '@/libs/hooks/useContextModal';

type ProfileContentUserInfo = {
  className?: string;
  userProfileData: GetUserProfileResponse;
};

const USER_PROFILE_DROPDOWN_ID = 'planDetailDropdown';

export default function ProfileContentUserInfo({ className, userProfileData }: ProfileContentUserInfo) {
  const { closeDropdown } = useContextDropdown<HTMLButtonElement>(USER_PROFILE_DROPDOWN_ID);
  const { openModal, closeModal } = useContextModal();
  const [isEditMode, setIsEditMode] = useState(false);

  const { introduce, is_editable, name, profile_img_url } = userProfileData;

  const handleEnableEditMode = () => {
    closeDropdown();
    setIsEditMode(true);
  };

  const handleDeleteUserModalOpen = () => {
    closeDropdown();
    openModal(<UserUnregistrationModal nickname={name} onRequestClose={closeModal} />);
  };

  const handleFinishUserProfileEdit = () => {
    setIsEditMode(false);
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
      <ConditionalRender condition={is_editable}>
        <KebabDropdownButton
          dropdownId={USER_PROFILE_DROPDOWN_ID}
          className="absolute right-5 top-5 size-6 md:right-6 md:top-6"
          dropdownClassName="right-0 top-12 md:right-6"
        >
          <DropdownItem
            onClick={() => handleEnableEditMode()}
            icon={<EditSvg color={COLORS.BLACK_01} />}
            text="프로필 수정"
          />
          <DropdownItem
            className="text-red-01"
            onClick={() => handleDeleteUserModalOpen()}
            icon={<DeleteSvg color={COLORS.RED_01} />}
            text="계정 삭제"
          />
        </KebabDropdownButton>
      </ConditionalRender>
    </div>
  );
}
