import { Schedule } from '@/apis/types/common';

// payload
export type PutScheduleListPayload = { schedules: Schedule[] };
export type PatchScheduleListDeletePayload = { is_delete: boolean };

//response
export type PutScheduleListResponse = { article_id: number };
export type PatchDeleteScheduleListResponse = { is_delete: boolean };
