import Link from 'next/link';

import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import Button from '@/components/common/buttons/Button';
import NextImage from '@/components/common/NextImage';
import DefaultProfileImg from '@/icons/profile.svg?url';
import { APP_URLS } from '@/libs/constants/appPaths';

export type AuthButtonProps = {
  userProfile?: (Pick<GetUserProfileResponse, 'name' | 'profile_img_url'> & { userId?: number }) | null;
};

export default function AuthButton({ userProfile }: AuthButtonProps) {
  if (!userProfile || !userProfile.userId) {
    return (
      <Link href={APP_URLS.LOGIN}>
        <span className="btn-sm md:btn-md cursor-pointer text-primary-01">로그인</span>
      </Link>
    );
  }

  return (
    <Link href={APP_URLS.PROFILE(userProfile.userId)}>
      <Button className="gap-1.5">
        <NextImage
          className="size-7 md:size-8"
          src={userProfile?.profile_img_url || DefaultProfileImg}
          alt="profile"
          width={36}
          height={36}
        />
        <span className="font-caption-1 max-md:hidden">{userProfile.name}</span>
      </Button>
    </Link>
  );
}
