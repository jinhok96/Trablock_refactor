import { notFound } from 'next/navigation';

import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import articleReaderServices from '@/apis/services/article/reader/fetch';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import ProfileContent from '@/app/(dashboard)/profile/[userId]/_components/ProfileContent';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

type ProfilePageProps = {
  params: { userId: number };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = params;

  const headers = await getAuthorizationTokenHeader();

  const getUserProfileRes = await userProfileReaderServices.getUserProfile(userId, headers);
  const getArticleListByUserIdRes = await articleReaderServices.getArticleListByUserId(userId, DEFAULT_PARAMS, headers);
  const getBookmarkListRes = await articleReaderServices.getBookmarkList(userId, DEFAULT_PARAMS, headers);

  const { data: getUserProfileData, error: getUserProfileError } = getUserProfileRes.body;
  const { data: getArticleListByUserIdData, error: getArticleListByUserIdError } = getArticleListByUserIdRes.body;
  const { data: getBookmarkListData, error: getBookmarkListError } = getBookmarkListRes.body;

  if (!getUserProfileData || !getArticleListByUserIdData || !getBookmarkListData) notFound();
  if (getUserProfileError || getArticleListByUserIdError || getBookmarkListError) notFound();

  return (
    <ProfileContent
      userProfileData={getUserProfileData}
      articleListData={getArticleListByUserIdData}
      bookmarkListData={getBookmarkListData}
    />
  );
}
