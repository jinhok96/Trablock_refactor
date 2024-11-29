import { useEffect, useState } from 'react';

import { PlaceResult } from '@/apis/services/google/places/type';
import { useGetGooglePlacesDetail } from '@/apis/services/google/places/useService';
import { Location } from '@/apis/types/common';
import DropdownItem, { DropdownItemProps } from '@/components/common/dropdowns/DropdownItem';
import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import removeLocationSuffix from '@/libs/utils/removeLocationSuffix';

interface GoogleCitySearchInputDropdownItemProps<T> extends Omit<DropdownItemProps<T>, 'text'> {
  placeId: string;
  selectedList?: Location[];
  handleDropdownSelect: (item: CityDropdownListItem) => void;
}

function createCityItem(placeId: string, res: PlaceResult): Location | undefined {
  const { formattedAddress, addressComponents } = res;

  const newCity = addressComponents[0].longText;
  if (!newCity) return;

  const newCountry = addressComponents.find((item) => item.types.includes('country'))?.longText;
  if (!newCountry) return;

  // 필터링한 주소 배열
  // Array.from(new Set([...]))으로 중복 요소 제거
  const filteredAddressComponents = Array.from(
    new Set(
      addressComponents
        .filter(({ longText, types }) => {
          if (!types.includes('political')) return false;
          if (types.includes('administrative_area_level_4' || 'administrative_area_level_5')) return false;
          if (longText === newCity) return false;
          if (!formattedAddress.includes(longText)) return false;
          return true;
        })
        .map((item) => item.longText)
        .reverse()
    )
  );

  const newAddress = filteredAddressComponents.join(' ');

  return {
    place_id: placeId,
    address: newAddress,
    city: removeLocationSuffix(newCity, newCountry)
  };
}

export default function GoogleCitySearchInputDropdownItem<T>({
  placeId,
  selectedList,
  handleDropdownSelect,
  ...dropdownItemProps
}: GoogleCitySearchInputDropdownItemProps<T>) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const { data } = useGetGooglePlacesDetail(placeId);

  useEffect(() => {
    if (!data?.body) return;
    const newCityItem = createCityItem(placeId, data.body);

    if (!newCityItem) return;

    const { address, city } = newCityItem;
    setAddress(address);
    setCity(city);
  }, [data]);

  if (!address || !city) return;

  return (
    <DropdownItem
      {...dropdownItemProps}
      selected={selectedList?.some((listItem) => listItem.place_id === placeId)}
      onClick={() => handleDropdownSelect({ place_id: placeId, address, city, key: placeId, value: city })}
    >
      <div className="w-full text-left">
        <p className="font-caption-2 mb-0.5 text-gray-01">{address}</p>
        <p className="mb-0.5 font-normal">{city}</p>
      </div>
    </DropdownItem>
  );
}
