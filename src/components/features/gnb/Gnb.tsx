import Link from 'next/link';

import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { getAuthorizationTokenHeader, getUserId } from '@/app/actions/cookieActions';
import GnbMenu from '@/components/features/gnb/GnbMenu';
import SearchInput from '@/components/features/gnb/SearchInput';
import TrablockFullSvg from '@/icons/trablock-full.svg';
import { APP_URLS } from '@/libs/constants/appPaths';

type GnbProps = {
  className?: string;
};

export default async function Gnb({ className }: GnbProps) {
  const authTokenHeader = await getAuthorizationTokenHeader();
  const userId = await getUserId();

  let userProfile: (Pick<GetUserProfileResponse, 'name' | 'profile_img_url'> & { userId?: number }) | null = null;

  if (userId) {
    const res = await userProfileReaderServices.getUserProfile(userId, authTokenHeader, true);
    const { data } = res.body;
    if (data) {
      const { name, profile_img_url } = data;
      userProfile = { userId, name, profile_img_url };
    }
  }

  return (
    <>
      <div className={`border-b-1-inner fixed w-full  bg-white-01`}>
        <div className={`flex-row-center px-layout h-gnb relative m-auto w-full justify-between ${className}`}>
          <Link className="h-5 md:h-6" href={APP_URLS.HOME}>
            <TrablockFullSvg className="size-full" />
          </Link>
          <SearchInput className="max-md:hidden" />
          <GnbMenu userProfile={userProfile} />
        </div>
      </div>
      <div className="h-gnb" />
    </>
  );
}
