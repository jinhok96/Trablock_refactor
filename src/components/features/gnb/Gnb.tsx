import { headers } from 'next/headers';
import Link from 'next/link';

import { HEADERS } from '@/apis/constants/headers';
import GnbMenu from '@/components/features/gnb/GnbMenu';
import SearchInput from '@/components/features/gnb/SearchInput';
import TrablockFullSvg from '@/icons/trablock-full.svg';
import { APP_URLS } from '@/libs/constants/appUrls';

export default function Gnb() {
  const headerList = headers();
  const hideSearchUI = headerList.get(HEADERS.X_HIDE_SEARCH_UI);

  return (
    <nav className="flex-row-center px-layout h-gnb m-auto max-w-screen-xl justify-between">
      <Link className="h-5 md:h-6" href={APP_URLS.HOME}>
        <TrablockFullSvg className="size-full" />
      </Link>
      <SearchInput className={`max-md:hidden ${hideSearchUI && 'hidden'}`} />
      <GnbMenu hideSearchUI={hideSearchUI} />
    </nav>
  );
}
