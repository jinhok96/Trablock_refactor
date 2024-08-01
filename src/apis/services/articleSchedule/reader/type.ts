import { ScheduleList } from '@/apis/types/common';

type PlaceName = { place_name: string };

type Schedule = {
  visited_date: string;
  place_names: PlaceName[];
};

//response
export type GetScheduleListResponse = ScheduleList;
export type GetSchedulePlaceListResponse = {
  article_id: number;
  total_days: number;
  schedules: Schedule[];
};
