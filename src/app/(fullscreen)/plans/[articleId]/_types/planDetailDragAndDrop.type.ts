import { HTMLAttributes } from 'react';

import { Schedule } from '@/apis/types/common';
import {
  CommonBlockDetailData,
  EtcBlockDetailData,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';

// mapping할 때 사용할 데이터 타입
export type ScheduleWithKey = Schedule & {
  key: string;
};

export interface TabBlockProps extends HTMLAttributes<HTMLButtonElement> {
  schedule: ScheduleWithKey;
}

export type BaseData = Omit<CommonBlockDetailData, 'name'>;
export type BlockData = PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData | undefined;
