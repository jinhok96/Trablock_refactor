import { PlaceResult } from '@/apis/services/google/places/type';
import { Category, Transport } from '@/apis/types/common';
import PlaceEtcInput from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/PlaceEtcInput';
import PlaceSearch from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/PlaceSearch';
import PlaceSearchTransport from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/PlaceSearchTransport';
import {
  OnEtcSelect,
  OnPlaceSelect,
  OnTransportSelect
} from '@/app/(contentWithoutScroll)/plans/[articleId]/_types/modalData.type';
import { CATEGORY } from '@/libs/constants/modal';

export interface CreateBlockModalContentProps {
  category: Category;
  onPlaceSelect?: OnPlaceSelect;
  onTransportSelect?: OnTransportSelect;
  onEtcSelect?: OnEtcSelect;
}

export default function CreateBlockModalContent({
  category,
  onPlaceSelect,
  onTransportSelect,
  onEtcSelect
}: CreateBlockModalContentProps) {
  const handleTransportSelect = (transport: Transport, place: PlaceResult, secondPlace: PlaceResult) => {
    if (!onTransportSelect) return;
    onTransportSelect({ category, transport, place, secondPlace });
  };

  const handleEtcSelect = (name: string) => {
    if (!onEtcSelect) return;
    onEtcSelect({ category, name });
  };

  const handlePlaceSelect = (place: PlaceResult) => {
    if (!onPlaceSelect) return;
    onPlaceSelect({ category, place });
  };

  if (category === CATEGORY.교통) return <PlaceSearchTransport onTransportSelect={handleTransportSelect} />;
  if (category === CATEGORY.기타) return <PlaceEtcInput onPlaceInput={handleEtcSelect} />;
  return <PlaceSearch onPlaceSelect={handlePlaceSelect} />;
}
