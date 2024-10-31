'use client';

import { ChangeEvent, FormEventHandler, useCallback, useState } from 'react';

import GoogleCitySearchInput from '@/components/common/inputs/GoogleCitySearchInput';
import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import SearchSvg from '@/icons/search.svg';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';

type GnbSearchInputProps = {
  className?: string;
};

export default function GnbSearchInput({ className }: GnbSearchInputProps) {
  const [value, setValue] = useState('');

  const getNextHref = useCallback(
    (keyword: string) => {
      const newHref = new URL(window.location.origin + APP_URLS.SEARCH);
      newHref.searchParams.set(APP_QUERIES.KEYWORD, keyword);
      return newHref.toString();
    },
    [APP_URLS.SEARCH, APP_QUERIES.KEYWORD]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!value) return;

    const href = getNextHref(value);
    window.location.href = href;
  };

  const handleSelect = (item: CityDropdownListItem) => {
    const href = getNextHref(item.city);
    window.location.href = href;
  };

  return (
    <form className={`relative ${className}`} onSubmit={handleSubmit}>
      <GoogleCitySearchInput
        id="gnb-search-input"
        className="font-caption-2 md:font-caption-1 h-10 w-80 rounded-md bg-gray-03 pl-3 pr-[4.25rem] text-black-02 lg:w-[25rem]"
        placeholder="여행할 도시를 입력해주세요."
        buttonChildren={<SearchSvg height={20} color={COLORS.GRAY_01} strokeWidth="1.5" />}
        buttonType="submit"
        onDropdownSelect={handleSelect}
        onChange={handleChange}
      />
    </form>
  );
}
