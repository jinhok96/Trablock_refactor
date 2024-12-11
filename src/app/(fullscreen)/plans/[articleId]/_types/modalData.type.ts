import { PlaceResult } from '@/apis/services/google/places/type';
import { Category, Transport } from '@/apis/types/common';

// 장소 선택 함수 타입
export type OnPlaceSelectProps = {
  category: Category;
  place: PlaceResult;
};
export type OnPlaceSelect<T = object> = ({ category, place }: OnPlaceSelectProps & T) => void;

export type OnTransportSelectProps = {
  category: Category;
  transport: Transport;
  place: PlaceResult;
  secondPlace: PlaceResult;
};
export type OnTransportSelect<T = object> = ({
  category,
  transport,
  place,
  secondPlace
}: OnTransportSelectProps & T) => void;

export type OnEtcSelectProps = { category: Category; name: string };
export type OnEtcSelect<T = object> = ({ category, name }: OnEtcSelectProps & T) => void;

// 블록 데이터 타입
export type DefaultCreatedBlockData = {
  category: Category;
  place: null;
};

export type CreatedBlockData = OnPlaceSelectProps;
export type CreateTransportBlockData = OnTransportSelectProps;
export type CreateEtcBlockData = OnEtcSelectProps;

// 일정 상세 - 공통
export type CommonBlockDetailData = {
  category: Category;
  name: string;
  startAt: string;
  duration: string;
  budget: string;
  memo?: string;
};

// 일정 상세 - 숙소, 식당, 관광지, 액티비티
// placeId -> location, address, phone, homepage, photos[0,1,2]
export type PlaceBlockDetailData = CommonBlockDetailData & {
  placeId: string;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  homepage?: string;
};

// 일정 상세 - 교통
export type TransportBlockDetailData = CommonBlockDetailData & {
  transport: Transport;
  address: string;
  lat: number;
  lng: number;
  secondPlaceName: string;
  secondPlaceAddress: string;
  secondPlaceLat: number;
  secondPlaceLng: number;
};

// 일정 상세 - 기타
export type EtcBlockDetailData = CommonBlockDetailData;

// 일정 상세 편집 타입
export type OnBlockDetailEditProps = {
  startAt: string;
  duration: string;
  budget: string;
  memo?: string;
};
export type OnBlockDetailEdit<T = Record<string, unknown>> = ({
  startAt,
  duration,
  budget,
  memo
}: OnBlockDetailEditProps & T) => void;

// 비용 상세 편집 타입
export type OnBudgetDetailEditProps = {
  budget: string;
};
export type OnBudgetDetailEdit<T = Record<string, unknown>> = ({ budget }: OnBudgetDetailEditProps & T) => void;
