import { ChangeEvent, KeyboardEventHandler, useEffect, useMemo, useState } from 'react';

import { usePostGooglePlacesAutocomplete } from '@/apis/services/google/places/useService';
import { Location } from '@/apis/types/common';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import { DropdownList, DropdownListItem } from '@/components/common/dropdowns/type';
import FormInput, { FormInputProps } from '@/components/common/inputs/FormInput';
import SearchSvg from '@/icons/search.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import removeLocationSuffix from '@/libs/utils/removeLocationSuffix';

export type LocationDropdownListItem = DropdownListItem<Location>;
export type LocationDropdownList = DropdownList<Location>;

interface PlanOverviewLocationSearchInputProps extends FormInputProps {
  id: string;
  onDropdownSelect: (item: LocationDropdownListItem) => void;
  selectedList: Location[];
}

export default function PlanOverviewLocationSearchInput({
  id,
  onDropdownSelect,
  selectedList,
  ...formInputProps
}: PlanOverviewLocationSearchInputProps) {
  const [value, setValue] = useState('');
  const [locationList, setLocationList] = useState<LocationDropdownList>([]);
  const [isClosing, setIsClosing] = useState(false);
  const { containerRef, dropdownRef, openDropdown, closeDropdown } = useContextDropdown(id);
  const { mutate: postGooglePlacesAutocomplete } = usePostGooglePlacesAutocomplete();

  const pushLocationItem = useMemo(
    () => (list: Location[], item: Location) => {
      if (list.some((city) => city.place_id === item.place_id)) return;
      list.push(item);
    },
    []
  );

  const handleOpenLocationDropdown = (dropdownId: string) => {
    if (locationList.length === 0) return;
    openDropdown(dropdownId);
  };

  const handleGetLocationAutocompleteList = (input: string) => {
    if (!input) return;
    postGooglePlacesAutocomplete(
      { input, includedPrimaryTypes: '(cities)' },
      {
        onSuccess: (response) => {
          const cityList: Location[] = [];
          const { suggestions } = response.body;

          suggestions?.map((item) => {
            const { placePrediction } = item;
            const { placeId } = placePrediction;
            const { text: city } = placePrediction.structuredFormat.mainText;
            const address = placePrediction.text.text.slice(0, -city.length).trim();
            const country = address.split(' ')[0];
            const cityWithoutSuffix = removeLocationSuffix(city, country);
            const newCityItem: Location = {
              place_id: placeId,
              address,
              city: cityWithoutSuffix
            };
            return pushLocationItem(cityList, newCityItem);
          });

          // 결과에 따라 드롭다운 열기
          if (cityList.length === 0) return;
          const newLocationList: LocationDropdownList = [];
          cityList.map((item) => {
            const newItem: LocationDropdownListItem = { key: item.place_id, value: item.city, ...item };
            newLocationList.push(newItem);
          });
          setLocationList(newLocationList);
          openDropdown(id);
        }
      }
    );
  };

  const handleLocationSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    handleGetLocationAutocompleteList(value);
  };

  const handlePreventEnterInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const handleDropdownSelect = (item: LocationDropdownListItem) => {
    onDropdownSelect(item);
    closeDropdown();
    setIsClosing(true);
  };

  useEffect(() => {
    if (!isClosing) return;
    setIsClosing(false);
    setLocationList([]);
    setValue('');
  }, [isClosing]);

  return (
    <div className="relative" ref={containerRef}>
      <FormInput
        {...formInputProps}
        id={id}
        className="pr-10"
        labelClassName="font-title-4 pb-2"
        value={value}
        onChange={handleLocationSearchChange}
        onFocus={() => handleOpenLocationDropdown(id)}
        onKeyDown={handlePreventEnterInput}
        onLabelClick={() => closeDropdown()}
        buttonClassName="right-3"
        buttonChildren={<SearchSvg height={24} color={COLORS.BLACK_01} strokeWidth={1} />}
        onButtonClick={() => handleGetLocationAutocompleteList(value)}
        placeholder="여행할 도시를 입력해주세요."
      >
        여행 장소
      </FormInput>
      <Dropdown id={id} ref={dropdownRef}>
        {locationList?.map((item) => (
          <DropdownItem
            key={item.key}
            selected={selectedList.some((listItem) => listItem.place_id === item.place_id)}
            onClick={() => handleDropdownSelect(item)}
          >
            <div className="w-full text-left">
              <p className="font-caption-2 mb-0.5 text-gray-01">{item.address}</p>
              <p>{item.city}</p>
            </div>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}
