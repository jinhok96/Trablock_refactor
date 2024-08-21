'use client';

import { ChangeEvent, FormEvent, FormHTMLAttributes, useEffect, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/common/buttons/Button';
import Input from '@/components/common/inputs/Input';
import SearchSvg from '@/icons/search.svg';
import RemoveSvg from '@/icons/x-circle.svg';
import { APP_URLS } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';

type SearchInputProps = FormHTMLAttributes<HTMLFormElement>;

export default function SearchInput({ className }: SearchInputProps) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [searchValue, setSearchValue] = useState(params.get('keyword') || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleRemoveButtonClick = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  const handleSearchButtonClick = (e: FormEvent) => {
    e.preventDefault();
    const trimmedValue = searchValue.trimStart();
    if (!trimmedValue) return;
    setSearchValue(trimmedValue);
    inputRef.current?.blur();
    router.push(APP_URLS.SEARCH + '?keyword=' + trimmedValue);
  };

  useEffect(() => {
    if (path === APP_URLS.SEARCH) return;
    setSearchValue('');
  }, [path]);

  return (
    <form className={`relative ${className}`} onSubmit={handleSearchButtonClick}>
      <Input
        className="font-caption-2 md:font-caption-1 h-10 w-80 rounded bg-gray-03 pl-3 pr-[4.25rem] text-black-02 lg:w-[25rem]"
        value={searchValue}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <div className="flex-row-center absolute right-3 top-1/2 -translate-y-1/2 gap-2">
        <RemoveSvg
          className={`cursor-pointer ${!searchValue && 'hidden'}`}
          height={16}
          fill={COLORS.GRAY_01}
          onClick={handleRemoveButtonClick}
        />
        <Button type="submit">
          <SearchSvg height={20} stroke={COLORS.GRAY_01} strokeWidth="2" />
        </Button>
      </div>
    </form>
  );
}
