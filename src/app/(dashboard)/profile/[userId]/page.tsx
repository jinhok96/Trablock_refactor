import { notFound } from 'next/navigation';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import ProfileContent from '@/app/(dashboard)/profile/[userId]/_components/ProfileContent';
import { ProfileTab } from '@/app/(dashboard)/profile/[userId]/_types/type';
import { getAuthorizationTokenHeader, getUserId } from '@/app/actions/cookieActions';
import { APP_QUERIES } from '@/libs/constants/appPaths';

type ProfilePageProps = {
  params: { userId: string };
  searchParams: Record<string, string>;
};

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const userId = Number(params.userId);
  const initSelectedTab: ProfileTab = (searchParams[APP_QUERIES.TAB] as ProfileTab) || 'plans';

  const myUserId = (await getUserId()) || 0;
  const headers = await getAuthorizationTokenHeader();

  const getUserProfileRes = await userProfileReaderServices.getUserProfile(userId, headers, userId === myUserId);
  const getArticleListByUserIdRes = await articleReaderServices.getArticleListByUserId(userId, headers);
  const getBookmarkListRes = await articleReaderServices.getBookmarkList(userId, headers);

  const { data: getUserProfileData, error: getUserProfileError } = getUserProfileRes.body;
  const { data: getPlanListByUserIdData, error: getPlanListByUserIdError } = getArticleListByUserIdRes.body;
  const { data: getBookmarkListData, error: getBookmarkListError } = getBookmarkListRes.body;

  if (!getUserProfileData || !getPlanListByUserIdData || !getBookmarkListData) notFound();
  if (getUserProfileError || getPlanListByUserIdError || getBookmarkListError) notFound();

  if (userId === myUserId)
    return (
      <ProfileContent
        userId={userId}
        userProfileData={getUserProfileData}
        initPlanListData={getPlanListByUserIdData}
        initBookmarkListData={getBookmarkListData}
        initSelectedTab={initSelectedTab}
        myProfile={getUserProfileData}
      />
    );

  const getMyUserProfileRes = await userProfileReaderServices.getUserProfile(myUserId, headers, true);
  const { data: getMyUserProfileData, error: getMyUserProfileError } = getMyUserProfileRes.body;

  if (!getMyUserProfileData || getMyUserProfileError) notFound();

  return (
    <ProfileContent
      userId={userId}
      userProfileData={getUserProfileData}
      initPlanListData={getPlanListByUserIdData}
      initBookmarkListData={getBookmarkListData}
      initSelectedTab={initSelectedTab}
      myProfile={getMyUserProfileData}
    />
  );
}
