import { decode } from 'jsonwebtoken';
import Link from 'next/link';

import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';
import GnbMenu from '@/components/features/gnb/GnbMenu';
import SearchInput from '@/components/features/gnb/SearchInput';
import TrablockFullSvg from '@/icons/trablock-full.svg';
import { APP_URLS } from '@/libs/constants/appPaths';

export default async function Gnb() {
  const authTokenHeader = getAuthorizationTokenHeader();

  const decodedToken = decode(authTokenHeader['Authorization-Token']) as { userId?: number };
  const userId = decodedToken?.userId;

  const res = await userProfileReaderServices.getUserProfile(userId || 0, authTokenHeader, true);
  const userProfile: (Pick<GetUserProfileResponse, 'name' | 'profile_img_url'> & { userId?: number }) | null = res.body
    .data && {
    userId: userId,
    name: res.body.data.name,
    profile_img_url: res.body.data.profile_img_url
  };

  return (
    <>
      <nav className="flex-row-center px-layout h-gnb border-b-1-inner fixed m-auto w-full max-w-screen-xl justify-between bg-white-01">
        <Link className="h-5 md:h-6" href={APP_URLS.HOME}>
          <TrablockFullSvg className="size-full" />
        </Link>
        <SearchInput className="max-md:hidden" />
        <GnbMenu userProfile={userProfile} />
      </nav>
      <div className="h-gnb" />
    </>
  );
}
