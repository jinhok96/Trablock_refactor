import { FormEvent } from 'react';

import GoogleCitySearchInput from '@/components/common/inputs/GoogleCitySearchInput';
import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import SearchSvg from '@/icons/search.svg';
import { COLORS } from '@/libs/constants/colors';

type GnbSearchInputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, value: string) => void;
  handleCitySelect: (item: CityDropdownListItem) => void;
};

export default function GnbSearchInput({
  value,
  onChange,
  handleSubmit,
  handleCitySelect,
  className
}: GnbSearchInputProps) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <form className={`relative mx-20 w-full max-w-[25rem] ${className}`} onSubmit={(e) => handleSubmit(e, value)}>
      <GoogleCitySearchInput
        id="gnb-search-input"
        value={value}
        onChange={handleChange}
        className="font-caption-2 md:font-caption-1 h-10 rounded-md bg-gray-03 pl-3 text-black-02"
        placeholder="여행할 도시를 입력해주세요."
        buttonChildren={<SearchSvg height={20} color={COLORS.GRAY_01} strokeWidth="1.5" />}
        buttonType="submit"
        onDropdownSelect={handleCitySelect}
        keepInputValueAfterSelect
      />
    </form>
  );
}
