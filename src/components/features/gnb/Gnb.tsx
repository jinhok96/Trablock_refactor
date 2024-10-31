import Link from 'next/link';

import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { getAuthorizationTokenHeader, getUserId } from '@/app/actions/cookieActions';
import GnbMenu from '@/components/features/gnb/GnbMenu';
import GnbSearchInput from '@/components/features/gnb/GnbSearchInput';
import TrablockFullSvg from '@/icons/trablock-full.svg';
import { APP_URLS } from '@/libs/constants/appPaths';

type GnbProps = {
  widthMaxFull?: boolean;
};

export default async function Gnb({ widthMaxFull }: GnbProps) {
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
      <div className="border-b-1-inner flex-col-center px-layout fixed w-full bg-white-01">
        <div className={`flex-row-center h-gnb relative w-full justify-between ${!widthMaxFull && 'max-w-screen-xl'}`}>
          <Link className="h-5 md:h-6" href={APP_URLS.HOME}>
            <TrablockFullSvg className="size-full" />
          </Link>
          <GnbSearchInput className="max-md:hidden" />
          <GnbMenu userProfile={userProfile} />
        </div>
      </div>
      <div className="h-gnb" />
    </>
  );
}
