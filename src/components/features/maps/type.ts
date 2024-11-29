import { Category } from '@/apis/types/common';

export type Coordinate = {
  lat: number;
  lng: number;
};

export type MapMarker = {
  order: number;
  category: Category;
  coordinate: Coordinate;
  transport?: 'start' | 'end';
};

export type MapMarkerList = MapMarker[];
