'use client';

import { FormEvent, useEffect, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import AuthButton from '@/components/features/gnb/AuthButton';
import GnbSearchInput from '@/components/features/gnb/GnbSearchInput';
import GnbSearchInputModal from '@/components/modals/GnbSearchInputModal';
import CalendarAddSvg from '@/icons/calendar-add.svg';
import SearchSvg from '@/icons/search.svg';
import TrablockFullSvg from '@/icons/trablock-full.svg';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextModal from '@/libs/hooks/useContextModal';
import useRouter from '@/libs/hooks/useRouter';

interface GnbMenuProps {
  widthMaxFull?: boolean;
}

export default function GnbMenu({ widthMaxFull }: GnbMenuProps) {
  const router = useRouter();
  const params = useSearchParams();
  const keyword = params.get(APP_QUERIES.KEYWORD) || '';

  const [value, setValue] = useState(keyword);
  const { openModal } = useContextModal();

  const handleSearchInputChange = (value: string) => {
    setValue(value);
  };

  const handleSearchButtonClick = () => {
    openModal(
      <GnbSearchInputModal
        value={value}
        onChange={handleSearchInputChange}
        handleSubmit={handleSubmit}
        handleCitySelect={handleCitySelect}
      />
    );
  };

  const getNextKeywordHref = (keyword: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    current.set(APP_QUERIES.KEYWORD, keyword);

    return APP_URLS.SEARCH + '?' + current.toString();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    if (!value) return;
    const href = getNextKeywordHref(value);
    router.hardPush(href);
  };

  const handleCitySelect = (item: CityDropdownListItem) => {
    const href = getNextKeywordHref(item.city);
    router.hardPush(href);
  };

  useEffect(() => {
    setValue(keyword);
  }, [keyword]);

  return (
    <div className={`flex-row-center h-gnb relative w-full justify-between ${!widthMaxFull && 'max-w-screen-xl'}`}>
      <Link className="h-5 shrink-0 md:h-6" href={APP_URLS.HOME}>
        <TrablockFullSvg className="size-full" />
      </Link>
      <GnbSearchInput
        id="gnb-search-input"
        className="mx-20 max-w-[25rem] max-md:hidden"
        inputClassName="font-caption-2 md:font-caption-1 h-10 rounded-md bg-gray-03 pl-3 text-black-02"
        value={value}
        onChange={handleSearchInputChange}
        handleSubmit={handleSubmit}
        handleCitySelect={handleCitySelect}
      />
      <div className="flex-row-center gap-4 md:gap-6">
        <SearchSvg
          className="size-[1.375rem] cursor-pointer md:hidden"
          color={COLORS.BLACK_01}
          strokeWidth="1"
          onClick={handleSearchButtonClick}
        />
        <Link href={APP_URLS.PLAN_CREATE}>
          <CalendarAddSvg className="size-[1.375rem] cursor-pointer md:size-7" color={COLORS.BLACK_01} />
        </Link>
        <AuthButton />
      </div>
    </div>
  );
}
