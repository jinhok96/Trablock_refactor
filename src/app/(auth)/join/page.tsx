import Link from 'next/link';

import JoinForm from '@/app/(auth)/join/_components/JoinForm';
import SocialJoin from '@/app/(auth)/join/_components/SocialJoin';
import FullLogoSvg from '@/icons/trablock-full.svg';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { METADATA } from '@/libs/constants/metadata';

type JoinPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata() {
  return {
    title: METADATA.title + ' | 회원가입'
  };
}

export default function JoinPage({ searchParams }: JoinPageProps) {
  const nextParam = searchParams[APP_QUERIES.NEXT] || '';
  const nextPath = nextParam ? `?${APP_QUERIES.NEXT}=${nextParam}` : '';

  return (
    <div className="m-auto max-w-[22.5rem]">
      <Link href={APP_URLS.HOME}>
        <FullLogoSvg className="m-auto mb-6 h-9" />
      </Link>
      <div className="flex-row-center font-caption-1 mb-8 justify-center gap-2 text-black-03">
        트래블록 계정이 있으신가요?
        <Link href={APP_URLS.LOGIN + nextPath}>
          <span className="font-btn-2 border-b border-primary-01 text-primary-01">로그인</span>
        </Link>
      </div>
      <div className="mb-10">
        <p className="font-caption-2 mb-3 text-center text-gray-01">SNS 계정으로 회원가입</p>
        <SocialJoin />
      </div>
      <div className="mb-10 w-full border border-b" />
      <JoinForm className="mb-14" />
    </div>
  );
}
