import { Category } from '@/apis/types/common';
import { CommonBlockDetailData } from '@/app/(contentWithoutScroll)/plans/[articleId]/_types/modalData.type';
import { DropdownList } from '@/components/common/dropdowns/type';

export const DEFAULT_CATEGORY = '숙소';
export const CATEGORY_LIST: Category[] = ['숙소', '식당', '관광지', '액티비티', '교통', '기타'];
export const CATEGORY: { [key: string]: string } = {
  숙소: '숙소',
  식당: '식당',
  관광지: '관광지',
  액티비티: '액티비티',
  교통: '교통',
  기타: '기타'
};

export const DEFAULT_BLOCK_DATA: CommonBlockDetailData = {
  category: DEFAULT_CATEGORY,
  name: '',
  startAt: '0000',
  duration: '0000',
  budget: '0',
  memo: ''
};

export type DropdownAmPm = '오전' | '오후';
export const DROPDOWN_AMPM: DropdownList<object, DropdownAmPm, DropdownAmPm> = [
  { key: '오전', value: '오전' },
  { key: '오후', value: '오후' }
];

export type DropdownHour = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
export const DROPDOWN_HOUR: DropdownList<object, DropdownHour, DropdownHour> = [
  { key: '01', value: '01' },
  { key: '02', value: '02' },
  { key: '03', value: '03' },
  { key: '04', value: '04' },
  { key: '05', value: '05' },
  { key: '06', value: '06' },
  { key: '07', value: '07' },
  { key: '08', value: '08' },
  { key: '09', value: '09' },
  { key: '10', value: '10' },
  { key: '11', value: '11' },
  { key: '12', value: '12' }
];

export type DropdownMinute = '00' | '05' | '10' | '15' | '20' | '25' | '30' | '35' | '40' | '45' | '50' | '55';
export const DROPDOWN_MINUTE: DropdownList<object, DropdownMinute, DropdownMinute> = [
  { key: '00', value: '00' },
  { key: '05', value: '05' },
  { key: '10', value: '10' },
  { key: '15', value: '15' },
  { key: '20', value: '20' },
  { key: '25', value: '25' },
  { key: '30', value: '30' },
  { key: '35', value: '35' },
  { key: '40', value: '40' },
  { key: '45', value: '45' },
  { key: '50', value: '50' },
  { key: '55', value: '55' }
];
