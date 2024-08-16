'use client';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import Input from '@/components/common/inputs/Input';
import SearchSvg from '@/icons/search.svg';
import RemoveSvg from '@/icons/x-circle.svg';
import { APP_URLS } from '@/libs/constants/appUrls';
import { COLORS } from '@/libs/constants/colors';

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleRemoveButtonClick = () => {
    setSearchValue('');
  };

  const handleSearchButtonClick = () => {
    if (!searchValue) router.push(APP_URLS.PLAN_LIST);
    router.push(APP_URLS.SEARCH + '?keyword=' + searchValue);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        className="font-caption-2 md:font-caption-1 h-10 w-80 rounded bg-gray-03 pl-3 pr-[4.25rem] text-black-02 lg:w-[25rem]"
        value={searchValue}
        onChange={handleInputChange}
      />
      <div className="flex-row-center absolute right-3 top-1/2 -translate-y-1/2 gap-2">
        <RemoveSvg
          className={`cursor-pointer ${!searchValue && 'hidden'}`}
          height={16}
          fill={COLORS.GRAY_01}
          onClick={handleRemoveButtonClick}
        />
        <SearchSvg className="" height={20} stroke={COLORS.GRAY_01} strokeWidth="2" onClick={handleSearchButtonClick} />
      </div>
    </div>
  );
}
