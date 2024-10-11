'use client';

import { GetArticleListByUserIdResponse, GetBookmarkListResponse } from '@/apis/services/article/reader/type';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import ProfileContentTabInfo from '@/app/(dashboard)/profile/[userId]/_components/ProfileContentTabInfo';
import ProfileContentUserInfo from '@/app/(dashboard)/profile/[userId]/_components/ProfileContentUserInfo';

type ProfileContentProps = {
  userProfileData: GetUserProfileResponse;
  articleListData: GetArticleListByUserIdResponse;
  bookmarkListData: GetBookmarkListResponse;
};

export default function ProfileContent({ userProfileData, articleListData, bookmarkListData }: ProfileContentProps) {
  return (
    <div className="md:pt-10 xl:flex xl:flex-row xl:gap-10">
      <ProfileContentUserInfo
        className="relative py-6 md:mb-10 md:rounded-lg md:px-6 md:shadow-button xl:w-80"
        userProfileData={userProfileData}
      />
      <ProfileContentTabInfo articleListData={articleListData} bookmarkListData={bookmarkListData} />
    </div>
  );
}
