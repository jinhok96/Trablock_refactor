import { SortParam } from '@/apis/types/common';

export const SORT_OPTIONS = {
  createAt: '최신순',
  popularity: '인기순'
};

export const SORT_PARAM: Record<'createAt' | 'popularity', SortParam> = {
  createAt: 'createdAt,desc',
  popularity: 'popularity'
};
