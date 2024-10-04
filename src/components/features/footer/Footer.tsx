import Link from 'next/link';

import CopyrightSvg from '@/icons/copyright.svg';
import GithubSvg from '@/icons/github.svg';
import { COLORS } from '@/libs/constants/colors';
import { EXTERNAL_URLS } from '@/libs/constants/externalUrls';

export default function Footer() {
  return (
    <div className="flex-col-center w-full gap-6 bg-primary-03 p-10 max-md:px-5">
      <div className="p-2">
        <Link href={EXTERNAL_URLS.GITHUB} target="_blank">
          <GithubSvg className="size-8 cursor-pointer" color={COLORS.BLACK_03} />
        </Link>
      </div>
      <div className="flex-row-center gap-4">
        <span className="font-footer text-black-03">서비스 소개</span>
        <span className="font-footer text-black-03">이용약관</span>
        <span className="font-footer text-black-03">개인정보처리방침</span>
      </div>
      <div className="flex-row-center gap-1">
        <CopyrightSvg className="size-4" color={COLORS.BLACK_03} />
        <span className="font-footer text-black-03">2024 Trablock</span>
      </div>
    </div>
  );
}
