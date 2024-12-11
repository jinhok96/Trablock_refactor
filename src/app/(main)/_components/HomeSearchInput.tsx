'use client';

import { FormEvent, useState } from 'react';

import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import GnbSearchInput from '@/components/features/gnb/GnbSearchInput';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import useRouter from '@/libs/hooks/useRouter';

export default function HomeSearchInput() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const getNextKeywordHref = (keyword: string) => {
    const current = new URLSearchParams();
    current.set(APP_QUERIES.KEYWORD, keyword);

    return APP_URLS.SEARCH + '?' + current.toString();
  };

  const handleSearchInputChange = (value: string) => {
    setValue(value);
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

  return (
    <GnbSearchInput
      id="home-search-input"
      className="max-w-xl"
      value={value}
      onChange={handleSearchInputChange}
      handleSubmit={handleSubmit}
      handleCitySelect={handleCitySelect}
      placeholder="여행할 도시를 검색해보세요!"
    />
  );
}
