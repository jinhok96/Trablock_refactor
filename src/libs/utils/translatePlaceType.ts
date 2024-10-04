import { get } from 'lodash';

import { PLACE_TYPES } from '@/constants/googleMaps';

// place.types[0]를 한국어로 번역하는 유틸 함수
export default function translatePlaceType(placeType?: string) {
  if (!placeType) return PLACE_TYPES.unknown;

  const findPlaceType = get(PLACE_TYPES, placeType, PLACE_TYPES.unknown);
  return findPlaceType;
}
