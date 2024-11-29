import { ScheduleDetail } from '@/apis/types/common';

type PlaceName = { place_name: string };

type Schedule = {
  visited_date: string;
  place_names: PlaceName[];
};

//response
export type GetScheduleListResponse = ScheduleDetail;
export type GetSchedulePlaceListResponse = {
  article_id: number;
  total_days: number;
  schedules: Schedule[];
};
