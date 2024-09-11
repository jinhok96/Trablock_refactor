export type SortParam = 'createdAt,DESC' | 'popularity';
export type Status = 'ACTIVE' | 'INACTIVE';
export type Category = '숙소' | '식당' | '관광지' | '액티비티' | '교통' | '기타';
export type Transport = '자동차' | '도보' | '자전거' | '대중교통';
export type Dtype = 'GENERAL' | 'TRANSPORT' | 'ETC';
export type Role = 'USER' | 'ADMIN';

export type EmptyResponse = string;

export type ErrorResponse = {
  local_message: string;
  code: number;
  field_errors: { [key: string]: string };
};

export type ResponseWrapper<T> = {
  data: T | null;
  error: ErrorResponse | null;
};

export type Params = {
  PAGE?: number;
  SIZE?: number;
  SORT?: SortParam;
};

export type Location = {
  place_id: string;
  address: string;
  city: string;
};

export type Pagination = {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_comment: number;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type Pageable = {
  offset: number;
  sort: Sort;
  paged: boolean;
  page_number: number;
  page_size: number;
  unpaged: boolean;
};

export type PaginationArticleList = {
  total_elements: number;
  total_pages: number;
  size: number;
  number: number;
  sort: Sort;
  number_of_elements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type ScheduleGeneral = {
  place_name: string;
  google_map_place_id: string;
  google_map_latitude: number;
  google_map_longitude: number;
  google_map_address: string;
  google_map_phone_number: string;
  google_map_home_page_url: string;
};

export type ScheduleTransport = {
  transportation: Transport;
  start_place_name: string;
  google_map_start_place_address: string;
  google_map_start_latitude: number;
  google_map_start_longitude: number;
  end_place_name: string;
  google_map_end_place_address: string;
  google_map_end_latitude: number;
  google_map_end_longitude: number;
};

export type ScheduleEtc = {
  place_name: string;
};

// 일정 블록 상세
export type Schedule = {
  schedule_id?: number;
  visited_date: string; // yyyy-MM-dd
  visited_time: string; // hh:mm
  sort_order: number;
  category: Category;
  duration_time: string; // hh:mm
  expense: string; // 12,000 KRW
  memo?: string;
  dtype: Dtype;
  schedule_general: ScheduleGeneral | null;
  schedule_transport: ScheduleTransport | null;
  schedule_etc: ScheduleEtc | null;
};

// 일정 블록 리스트
export type ScheduleList = {
  review_id?: number;
  is_editable: boolean;
  schedules: Schedule[];
};
