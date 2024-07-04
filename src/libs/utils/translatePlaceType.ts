import { PLACE_TYPES } from '@/constants/googleMaps';

// place.types[0]를 한국어로 번역하는 유틸 함수
export default function translatePlaceType(placeType?: string) {
  if (!placeType) return PLACE_TYPES.unknown;
  if (!PLACE_TYPES[placeType]) return PLACE_TYPES.unknown;
  return PLACE_TYPES[placeType];
}
