import Link from 'next/link';

import { PostLoginResponse } from '@/apis/services/user/authentication/type';
import Button from '@/components/common/buttons/Button';
import NextImage from '@/components/common/NextImage';
import DefaultProfileImg from '@/icons/profile.svg?url';
import { APP_URLS } from '@/libs/constants/appUrls';

export default function AuthButton({ userData }: { userData: PostLoginResponse | null }) {
  if (!userData)
    return (
      <Link href={APP_URLS.LOGIN}>
        <span className="btn-sm md:btn-md cursor-pointer text-primary-01">로그인</span>
      </Link>
    );
  return (
    <Link href={APP_URLS.PROFILE(userData?.user_id)}>
      <Button className="gap-2">
        <NextImage
          className="size-7 md:size-8"
          src={userData?.profile_img_url || DefaultProfileImg}
          alt="profile"
          width={36}
          height={36}
        />
        <span className="font-caption-1 max-md:hidden">{userData?.nickname}</span>
      </Button>
    </Link>
  );
}
