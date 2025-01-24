import Link from 'next/link';

import CopyrightSvg from '@/icons/copyright.svg';
import GithubSvg from '@/icons/github.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import { EXTERNAL_URLS } from '@/libs/constants/externalUrls';

export default function Footer() {
  return (
    <div className="flex-col-center mt-20 w-full gap-5 bg-primary-03 p-7 max-md:px-5 md:gap-6 md:p-8">
      <Link href={EXTERNAL_URLS.GITHUB} target="_blank">
        <GithubSvg className="size-6 cursor-pointer md:size-7" color={COLORS.BLACK_03} />
      </Link>
      <div className="flex-row-center font-footer gap-4 text-black-03">
        <Link href={APP_URLS.TERMS_OF_SERVICE} target="_blank">
          이용약관
        </Link>
        <Link href={APP_URLS.PRIVACY_POLICY} target="_blank">
          개인정보처리방침
        </Link>
      </div>
      <div className="flex-row-center font-footer gap-1 text-black-03">
        <CopyrightSvg className="size-4" color={COLORS.BLACK_03} />
        <span>Trablock</span>
      </div>
    </div>
  );
}
