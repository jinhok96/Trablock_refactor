import Link from 'next/link';

import PwInquiryForm from '@/app/(auth)/pwinquiry/_components/PwInquiryForm';
import FullLogoSvg from '@/icons/trablock-full.svg';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { METADATA } from '@/libs/constants/metadata';

type PwInquiryPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata() {
  return {
    title: METADATA.title + ' | 비밀번호찾기'
  };
}

export default async function PwInquiryPage({ searchParams }: PwInquiryPageProps) {
  const nextParam = searchParams[APP_QUERIES.NEXT] || '';
  const nextPath = nextParam ? `?${APP_QUERIES.NEXT}=${nextParam}` : '';

  return (
    <>
      <Link href={APP_URLS.HOME}>
        <FullLogoSvg className="m-auto mb-6 h-9" />
      </Link>
      <div className="flex-row-center font-caption-1 mb-10 justify-center gap-2 text-black-03">
        비밀번호가 기억나셨나요?
        <Link href={APP_URLS.LOGIN + nextPath}>
          <span className="font-btn-2 border-b border-primary-01 text-primary-01">로그인</span>
        </Link>
      </div>
      <PwInquiryForm />
    </>
  );
}
