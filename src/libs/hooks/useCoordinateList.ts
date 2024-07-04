import { useState } from 'react';

import { Coordinate } from '@/components/features/maps/type';
import { DEFAULT_COORDINATE_LIST } from '@/constants/googleMaps';

export default function useCoordinateList() {
  const [coordinateList, setCoordinateList] = useState<Coordinate[]>(DEFAULT_COORDINATE_LIST);

  return { coordinateList, setCoordinateList };
}
