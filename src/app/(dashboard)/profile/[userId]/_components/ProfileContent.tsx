'use client';

import { GetArticleListByUserIdResponse, GetBookmarkListResponse } from '@/apis/services/article/reader/type';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import ProfileContentTabInfo from '@/app/(dashboard)/profile/[userId]/_components/ProfileContentTabInfo';
import ProfileContentUserInfo from '@/app/(dashboard)/profile/[userId]/_components/ProfileContentUserInfo';
import { ProfileTab } from '@/app/(dashboard)/profile/[userId]/_types/type';

type ProfileContentProps = {
  userId: number;
  isMyProfile: boolean;
  userProfileData: GetUserProfileResponse;
  initPlanListData: GetArticleListByUserIdResponse;
  initBookmarkListData: GetBookmarkListResponse;
  initSelectedTab: ProfileTab;
};

export default function ProfileContent({
  userId,
  isMyProfile,
  userProfileData,
  initPlanListData,
  initBookmarkListData,
  initSelectedTab
}: ProfileContentProps) {
  return (
    <div className="mt-7 md:mt-10 xl:flex xl:flex-row xl:gap-10">
      <ProfileContentUserInfo
        className="relative mb-7 h-fit rounded-lg p-5 shadow-button md:mb-10 md:p-6 xl:w-96 xl:pt-7"
        userProfileData={userProfileData}
      />
      <ProfileContentTabInfo
        userId={userId}
        isMyProfile={isMyProfile}
        initPlanListData={initPlanListData}
        initBookmarkListData={initBookmarkListData}
        isEditable={userProfileData.is_editable}
        initSelectedTab={initSelectedTab}
      />
    </div>
  );
}
