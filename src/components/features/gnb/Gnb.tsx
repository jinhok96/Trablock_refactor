import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { getAuthorizationTokenHeader, getUserId } from '@/app/actions/cookieActions';
import { UserProfile } from '@/components/features/gnb/AuthButton';
import GnbMenu from '@/components/features/gnb/GnbMenu';

type GnbProps = {
  widthMaxFull?: boolean;
};

export default async function Gnb({ widthMaxFull }: GnbProps) {
  const authTokenHeader = await getAuthorizationTokenHeader();
  const userId = await getUserId();

  console.log('authTokenHeader', authTokenHeader);
  console.log('userId', userId);

  const userProfile: UserProfile = {
    userId: undefined,
    name: '',
    profile_img_url: ''
  };

  if (userId) {
    const res = await userProfileReaderServices.getUserProfile(userId, authTokenHeader, true);
    const { data } = res.body;
    if (data) {
      const { name, profile_img_url } = data;
      userProfile.userId = userId;
      userProfile.name = name;
      userProfile.profile_img_url = profile_img_url;
    }
  }

  return (
    <>
      <div className="border-b-1-inner flex-col-center px-layout fixed w-full bg-white-01">
        <GnbMenu userProfile={userProfile} widthMaxFull={widthMaxFull} />
      </div>
      <div className="h-gnb" />
    </>
  );
}
