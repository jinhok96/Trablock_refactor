'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import AuthButton, { AuthButtonProps } from '@/components/features/gnb/AuthButton';
import GnbSearchInput from '@/components/features/gnb/GnbSearchInput';
import GnbSearchInputModal from '@/components/modals/GnbSearchInputModal';
import CalendarAddSvg from '@/icons/calendar-add.svg';
import SearchSvg from '@/icons/search.svg';
import TrablockFullSvg from '@/icons/trablock-full.svg';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextModal from '@/libs/hooks/useContextModal';

interface GnbMenuProps extends AuthButtonProps {
  widthMaxFull?: boolean;
}

export default function GnbMenu({ userProfile, widthMaxFull }: GnbMenuProps) {
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

  const getNextHref = useCallback(
    (keyword: string) => {
      const newHref = new URL(window.location.origin + APP_URLS.SEARCH);
      newHref.searchParams.set(APP_QUERIES.KEYWORD, keyword);
      return newHref.toString();
    },
    [APP_URLS.SEARCH, APP_QUERIES.KEYWORD]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    if (!value) return;
    const href = getNextHref(value);
    window.location.href = href;
  };

  const handleCitySelect = (item: CityDropdownListItem) => {
    const href = getNextHref(item.city);
    window.location.href = href;
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
        className="max-md:hidden"
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
        <AuthButton userProfile={userProfile} />
      </div>
    </div>
  );
}
