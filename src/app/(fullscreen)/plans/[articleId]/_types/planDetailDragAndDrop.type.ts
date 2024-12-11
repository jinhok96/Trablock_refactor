import { HTMLAttributes } from 'react';

import { Schedule } from '@/apis/types/common';

// mapping할 때 사용할 데이터 타입
export type ScheduleWithKey = Schedule & {
  key: string;
};

export interface TabBlockProps extends HTMLAttributes<HTMLButtonElement> {
  schedule: ScheduleWithKey;
}
