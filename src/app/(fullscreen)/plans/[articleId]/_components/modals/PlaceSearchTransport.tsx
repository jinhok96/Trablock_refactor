import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { PlaceResult } from '@/apis/services/google/places/type';
import { useGetGooglePlacesPhotos, usePostGooglePlacesSearchText } from '@/apis/services/google/places/useService';
import { Transport } from '@/apis/types/common';
import PlaceSearchResult from '@/app/(fullscreen)/plans/[articleId]/_components/modals/PlaceSearchResult';
import NextImage from '@/components/common/images/NextImage';
import FormInput from '@/components/common/inputs/FormInput';
import SearchSvg from '@/icons/search.svg';
import DeleteSvg from '@/icons/x.svg';
import { COLORS } from '@/libs/constants/colors';
import { TRANSPORT_DROPDOWN_LIST } from '@/libs/constants/googleMaps';

interface PlaceSearchTransportProps {
  className?: string;
  onTransportSelect: (transport: Transport, place: PlaceResult, secondPlace: PlaceResult) => void;
}

export default function PlaceSearchTransport({ className, onTransportSelect }: PlaceSearchTransportProps) {
  const [value, setValue] = useState('');
  const [selectedTransport, setSelectedTransport] = useState<Transport>(TRANSPORT_DROPDOWN_LIST[0].key);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult>();
  const { mutate: postGooglePlacesSearchText, isPending, error } = usePostGooglePlacesSearchText();
  const { data: photo } = useGetGooglePlacesPhotos(selectedPlace?.photos?.[0].name || '', {
    maxWidthPx: 56 * 4,
    maxHeightPx: 56 * 4
  });

  const handleTransportChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSelectedTransport(value as Transport);
  };

  const handlePostPlacesSearchText = (value: string) => {
    if (!value) return setPlaces([]);
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

  const handlePlaceSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handlePostPlacesSearchText(value);
  };

  const handlePlaceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handlePlaceSelect = (place: PlaceResult) => {
    if (!selectedPlace) {
      setSelectedPlace(place);
      setPlaces([]);
      setValue('');
      return;
    }
    onTransportSelect(selectedTransport, selectedPlace, place);
  };

  return (
    <div className={className}>
      <FormInput
        id="transport"
        containerClassName="mb-10"
        labelClassName="modal-h2 mb-3"
        value={selectedTransport}
        onChange={handleTransportChange}
        type="dropdown"
        dropdownClassName="w-full"
        dropdownList={TRANSPORT_DROPDOWN_LIST}
        dropdownDefaultKey={TRANSPORT_DROPDOWN_LIST[0].key}
      >
        교통수단
      </FormInput>
      <p className="modal-h2 mb-3">장소 검색</p>
      <div className={`${!selectedPlace && 'hidden'}`}>
        <p className="font-subtitle-3 mb-2 text-gray-01">출발지</p>
        <div className="flex-row-center justify-between pb-4">
          <div className="flex-row-center">
            <NextImage className="size-14 rounded-md" src={photo?.body.photoUri} alt="placePhoto" sizes={56} />
            <div className="ml-3">
              <p className="font-subtitle-2 mb-1 line-clamp-1">{selectedPlace?.displayName.text}</p>
              <p className="font-caption-2 line-clamp-1 text-gray-01">{selectedPlace?.formattedAddress}</p>
            </div>
          </div>
          <div className="px-4">
            <DeleteSvg
              className="cursor-pointer"
              width={18}
              height={18}
              color={COLORS.BLACK_01}
              onClick={() => setSelectedPlace(undefined)}
            />
          </div>
        </div>
      </div>
      <form onSubmit={handlePlaceSearchSubmit}>
        <FormInput
          id="placeSearch"
          containerClassName="mb-4"
          labelClassName="font-subtitle-3 mb-2 text-gray-01"
          className="bg-gray-03"
          value={value}
          onChange={handlePlaceChange}
          placeholder={(!selectedPlace ? '출발지' : '도착지') + '이름을 입력해주세요.'}
          buttonClassName="right-3"
          buttonChildren={<SearchSvg height={20} color={COLORS.GRAY_01} strokeWidth="1.5" />}
          buttonType="submit"
        >
          {!selectedPlace ? '출발지' : '도착지'}
        </FormInput>
      </form>
      <PlaceSearchResult
        places={places}
        onPlaceSelect={handlePlaceSelect}
        isLoading={isPending}
        error={error?.message}
      />
    </div>
  );
}
