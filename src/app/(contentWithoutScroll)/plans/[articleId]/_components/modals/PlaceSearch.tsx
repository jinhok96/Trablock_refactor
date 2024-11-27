import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { PlaceResult } from '@/apis/services/google/places/type';
import { usePostGooglePlacesSearchText } from '@/apis/services/google/places/useService';
import PlaceSearchResult from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/PlaceSearchResult';
import FormInput from '@/components/common/inputs/FormInput';
import SearchSvg from '@/icons/search.svg';
import { COLORS } from '@/libs/constants/colors';

interface PlaceSearchProps {
  className?: string;
  onPlaceSelect: (place: PlaceResult) => void;
}

export default function PlaceSearch({ className, onPlaceSelect }: PlaceSearchProps) {
  const [value, setValue] = useState('');
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const { mutate: postGooglePlacesSearchText, isPending, error } = usePostGooglePlacesSearchText();

  const handlePostPlacesSearchText = (value: string) => {
    postGooglePlacesSearchText(
      { textQuery: value },
      {
        onSuccess: (res) => {
          const { places } = res.body;
          setPlaces(places);
        }
      }
    );
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handlePlaceSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!value) return setPlaces([]);
    handlePostPlacesSearchText(value);
  };

  return (
    <form className={className} onSubmit={handlePlaceSearchSubmit}>
      <FormInput
        id="placeSearch"
        containerClassName="mb-4"
        labelClassName="modal-h2 mb-3"
        className="bg-gray-03 pr-10"
        value={value}
        onChange={handleSearchChange}
        placeholder="장소 이름을 입력해주세요."
        buttonClassName="right-3"
        buttonChildren={<SearchSvg height={20} color={COLORS.GRAY_01} strokeWidth="1.5" />}
        buttonType="submit"
      >
        장소 검색
      </FormInput>
      <PlaceSearchResult places={places} onPlaceSelect={onPlaceSelect} isLoading={isPending} error={error?.message} />
    </form>
  );
}
