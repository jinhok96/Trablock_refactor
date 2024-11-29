import { Schedule } from '@/apis/types/common';

// Schedule 블록 추가 시 초기 데이터
const INIT_SCHEDULE_DATA: Omit<Schedule, 'schedule_id'> = {
  visited_date: '',
  visited_time: '00:00',
  sort_order: 0,
  category: '숙소',
  duration_time: '00:00',
  expense: '0',
  dtype: 'GENERAL',
  schedule_general: null,
  schedule_transport: null,
  schedule_etc: null
};

export default INIT_SCHEDULE_DATA;
