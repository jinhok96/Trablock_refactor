import Link from 'next/link';

import LoginForm from '@/app/(auth)/login/_components/LoginForm';
import SocialLogin from '@/app/(auth)/login/_components/SocialLogin';
import FullLogoSvg from '@/icons/trablock-full.svg';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { METADATA } from '@/libs/constants/metadata';

type LoginPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata() {
  return {
    title: METADATA.title + ' | 로그인'
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const nextParam = searchParams[APP_QUERIES.NEXT] || '';
  const nextPath = nextParam ? `?${APP_QUERIES.NEXT}=${nextParam}` : '';

  return (
    <div className="m-auto max-w-[22.5rem]">
      <Link href={APP_URLS.HOME}>
        <FullLogoSvg className="m-auto mb-12 h-9" />
      </Link>
      <LoginForm className="mb-5" />
      <div className="flex-row-center font-btn-text mb-10 justify-center gap-2 text-black-03">
        <Link href={APP_URLS.JOIN + nextPath}>
          <span>회원가입</span>
        </Link>
        <div className="h-3 w-[0.0625rem] bg-black-03" />
        <Link href={APP_URLS.PW_INQUIRY + nextPath}>
          <span>비밀번호 찾기</span>
        </Link>
      </div>
      <p className="font-caption-2 mb-4 text-center text-gray-01">SNS 계정으로 로그인/회원가입</p>
      <SocialLogin />
    </div>
  );
}
