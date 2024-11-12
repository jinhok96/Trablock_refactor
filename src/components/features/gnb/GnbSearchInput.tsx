import { FormEvent } from 'react';

import GoogleCitySearchInput from '@/components/common/inputs/GoogleCitySearchInput';
import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import SearchSvg from '@/icons/search.svg';
import { COLORS } from '@/libs/constants/colors';

type GnbSearchInputProps = {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
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
  className,
  inputClassName,
  placeholder
}: GnbSearchInputProps) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <form className={`relative w-full ${className}`} onSubmit={(e) => handleSubmit(e, value)}>
      <GoogleCitySearchInput
        id="gnb-search-input"
        value={value}
        onChange={handleChange}
        className={inputClassName}
        placeholder={placeholder || '여행할 도시를 입력해주세요.'}
        buttonChildren={<SearchSvg height={20} color={COLORS.GRAY_01} strokeWidth="1.5" />}
        buttonType="submit"
        onDropdownSelect={handleCitySelect}
        keepInputValueAfterSelect
      />
    </form>
  );
}
