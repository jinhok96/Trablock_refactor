import { ChangeEvent, KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import { useIsFetching } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import { usePostGooglePlacesAutocomplete } from '@/apis/services/google/places/useService';
import { Location } from '@/apis/types/common';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import FormInput, { FormInputProps } from '@/components/common/inputs/FormInput';
import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import GoogleCitySearchInputDropdownItem from '@/components/common/inputs/GoogleCitySearchInputDropdownItem';
import SearchSvg from '@/icons/search.svg';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';

interface GoogleCitySearchInputProps extends Omit<FormInputProps, 'onChange'> {
  id: string;
  onDropdownSelect: (item: CityDropdownListItem) => void;
  selectedList?: Location[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  keepInputValueAfterSelect?: boolean;
}

export default function GoogleCitySearchInput({
  id,
  onDropdownSelect,
  selectedList,
  className,
  labelClassName,
  buttonClassName,
  buttonChildren,
  children,
  placeholder,
  onChange,
  onKeyDown,
  keepInputValueAfterSelect,
  ...formInputProps
}: GoogleCitySearchInputProps) {
  const params = useSearchParams();
  const keyword = params.get(APP_QUERIES.KEYWORD) || '';

  const [value, setValue] = useState(keyword);
  const [cityList, setCityList] = useState<string[]>([]);
  const isDropdownClosingRef = useRef(false);
  const { containerRef, dropdownRef, openDropdown, closeDropdown, openedDropdownId } =
    useContextDropdown<HTMLDivElement>(id);
  const { mutate: postAutocomplete, reset: postAutocompleteReset } = usePostGooglePlacesAutocomplete();
  const isDropdownFetching = useIsFetching({ queryKey: [QUERY_KEYS.GOOGLE_PLACES, 'useGetGooglePlacesDetail'] });

  const dropdownId = 'dropdown' + id;

  const handleOpenDropdown = (dropdownId: string) => {
    isDropdownClosingRef.current = false;
    openDropdown(dropdownId);
  };

  const handleCloseDropdown = () => {
    isDropdownClosingRef.current = true;
    closeDropdown();
  };

  const handleFocusOpenCityDropdown = () => {
    if (!value) return;
    handleGetCityAutocompleteList(value);
  };

  const handleGetCityAutocompleteList = (input: string) => {
    if (!input) return handleCloseDropdown();

    postAutocomplete(
      {
        input,
        includedPrimaryTypes: '(cities)'
      },
      {
        onSuccess: (res) => {
          const autocompleteList = res.body.suggestions;
          if (!autocompleteList) return handleCloseDropdown();

          const newCityList: string[] = autocompleteList.map((item) => item.placePrediction.placeId);

          if (!newCityList.length) return handleCloseDropdown();
          setCityList(newCityList);

          handleOpenDropdown(dropdownId);
        }
      }
    );
  };

  const handleCitySearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) handleCloseDropdown();

    setValue(value);
    onChange?.(e);
    handleGetCityAutocompleteList(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    postAutocompleteReset();
    onKeyDown?.(e);
  };

  const handleDropdownSelect = (item: CityDropdownListItem) => {
    handleCloseDropdown();

    if (!keepInputValueAfterSelect) setValue('');
    else setValue(item.city);

    onDropdownSelect(item);
  };

  const isContained = useCallback((target: HTMLElement | null, element: HTMLElement | null): boolean => {
    if (!target) return false;
    if (!element) return false;
    const targetOuterHTML = target.outerHTML;
    const elementOuterHTML = element.outerHTML;
    if (elementOuterHTML.includes(targetOuterHTML)) return true;
    return false;
  }, []);

  useEffect(() => {
    setValue(keyword);
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openedDropdownId !== dropdownId) return;
      if (!containerRef.current) return;
      if (!dropdownRef.current) return;

      const target = e.target as HTMLElement;
      if (isContained(target, containerRef.current)) return (isDropdownClosingRef.current = false);
      if (isContained(target, dropdownRef.current)) return (isDropdownClosingRef.current = false);

      isDropdownClosingRef.current = true;
      closeDropdown();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef.current, dropdownRef.current, isDropdownClosingRef.current, closeDropdown]);

  return (
    <div className="relative" ref={containerRef}>
      <FormInput
        {...formInputProps}
        id={id}
        className={`pr-10 ${className}`}
        labelClassName={`font-title-4 pb-2 ${labelClassName}`}
        value={value}
        onChange={handleCitySearchChange}
        onFocus={() => handleFocusOpenCityDropdown()}
        onKeyDown={handleKeyDown}
        onLabelClick={() => closeDropdown()}
        buttonClassName={`right-3 ${buttonClassName}`}
        buttonChildren={buttonChildren || <SearchSvg height={24} color={COLORS.BLACK_01} strokeWidth={1} />}
        onButtonClick={() => handleGetCityAutocompleteList(value)}
        placeholder={placeholder}
      >
        {children}
      </FormInput>
      <Dropdown id={dropdownId} className={`w-full ${isDropdownFetching && 'hidden'}`} ref={dropdownRef}>
        {cityList?.map((placeId) => (
          <GoogleCitySearchInputDropdownItem
            key={placeId}
            placeId={placeId}
            selectedList={selectedList}
            handleDropdownSelect={handleDropdownSelect}
          />
        ))}
      </Dropdown>
    </div>
  );
}
