import { Schedule } from '@/apis/types/common';

// payload
export type PutScheduleListPayload = { schedules: Schedule[] };

//response
export type PutScheduleListResponse = { article_id: number };
