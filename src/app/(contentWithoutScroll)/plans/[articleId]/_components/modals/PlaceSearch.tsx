import { ChangeEventHandler, useState } from 'react';

import { PlaceResult } from '@/apis/services/google/places/type';
import { usePostGooglePlacesSearchText } from '@/apis/services/google/places/useService';
import PlaceSearchResult from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/PlaceSearchResult';
import FormInput from '@/components/common/inputs/FormInput';

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
    const { value } = e.target;
    setValue(value);
    if (!value) return setPlaces([]);
    handlePostPlacesSearchText(value);
  };

  return (
    <div className={className}>
      <FormInput
        id="placeSearch"
        containerClassName="mb-4"
        labelClassName="modal-h2 mb-3"
        className="bg-gray-03"
        value={value}
        onChange={handleSearchChange}
        placeholder="장소 이름을 입력해주세요."
      >
        장소 검색
      </FormInput>
      <PlaceSearchResult places={places} onPlaceSelect={onPlaceSelect} isLoading={isPending} error={error?.message} />
    </div>
  );
}
