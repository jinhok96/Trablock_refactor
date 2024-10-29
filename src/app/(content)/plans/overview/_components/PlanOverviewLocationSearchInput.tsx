import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react';

import { Suggestion } from '@/apis/services/google/places/type';
import { useGetGooglePlacesGetDetail, usePostGooglePlacesAutocomplete } from '@/apis/services/google/places/useService';
import { Location } from '@/apis/types/common';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import { DropdownList, DropdownListItem } from '@/components/common/dropdowns/type';
import FormInput, { FormInputProps } from '@/components/common/inputs/FormInput';
import SearchSvg from '@/icons/search.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import { isNumericRegex } from '@/libs/utils/isNumericRegex';
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
  const { containerRef, dropdownRef, openDropdown, closeDropdown } = useContextDropdown<HTMLDivElement>(id);
  const { mutateAsync: postGooglePlacesAutocomplete } = usePostGooglePlacesAutocomplete();
  const { mutateAsync: search } = useGetGooglePlacesGetDetail('');

  const handleOpenLocationDropdown = (dropdownId: string) => {
    if (locationList.length === 0) return;
    openDropdown(dropdownId);
  };

  const handleGetLocationAutocompleteList = async (input: string) => {
    if (!input) return;

    const autocompleteList: Suggestion[] = [];

    await postGooglePlacesAutocomplete(
      { input, includedPrimaryTypes: '(cities)' },
      {
        onSuccess: (response) => {
          const { suggestions } = response.body;
          if (!suggestions) return;
          autocompleteList.push(...suggestions);
        }
      }
    );

    const cityList: Location[] = (
      await Promise.all(
        autocompleteList.map(async (item) => {
          const { placePrediction } = item;
          const { placeId } = placePrediction;

          // 다른 언어일 수 있는 도시 이름을 최대한 한국어로 변경
          const res = (await search(placeId)).body;
          const city = res.displayName.text;
          const cityAddress = res.formattedAddress;

          const newCityItem: Location = {
            place_id: placeId,
            address: '',
            city: ''
          };

          const addressList = cityAddress.split(' ');
          const formattedAddressList =
            addressList
              .map((item) => {
                const splitItem = item.split(',' || '،')[0].trim();
                // formattedAddressList에서 숫자만으로 이루어진 요소(우편번호 등)를 제거
                if (isNumericRegex(splitItem)) return;
                return splitItem;
              })
              .filter((item) => !!item) || [];

          const cityIdx = formattedAddressList.findIndex((item) => item === city);

          if (cityIdx === -1) return;

          // 만약 도시 이름이 첫번째 아이템일 경우 첫번째 제외하고 나머지 역순으로 join -> address
          if (cityIdx === 0) {
            const flatAddress = formattedAddressList.slice(1).reverse().join(' ');
            newCityItem.address = flatAddress;
          } else if (cityIdx === formattedAddressList.length - 1) {
            // 만약 도시 이름이 마지막 아이템일 경우 마지막 제외하고 나머지 join -> address
            const flatAddress = formattedAddressList.slice(0, cityIdx).join(' ');
            newCityItem.address = flatAddress;
          } else return;

          const country = newCityItem.address.split(' ')[0];
          const cityWithoutSuffix = removeLocationSuffix(city, country);

          newCityItem.city = cityWithoutSuffix;

          return newCityItem;
        })
      )
    ).filter((item) => !!item);

    // 결과에 따라 드롭다운 열기
    if (cityList.length === 0) return;
    const newLocationList: LocationDropdownList = [];
    cityList.map((item) => {
      const newItem: LocationDropdownListItem = { key: item.place_id, value: item.city, ...item };
      newLocationList.push(newItem);
    });
    setLocationList(newLocationList);
  };

  useEffect(() => {
    if (!locationList.length) return closeDropdown();
    openDropdown(id);
  }, [locationList]);

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
      <Dropdown id={id} className="w-full" ref={dropdownRef}>
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
