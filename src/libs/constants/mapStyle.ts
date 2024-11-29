import { Category } from '@/apis/types/common';
import { COLORS } from '@/libs/constants/colors';

export const CATEGORY_COLOR: { [key in Category]: { bg: string; text: string } } = {
  숙소: {
    bg: COLORS.BLOCK_PINK_01,
    text: COLORS.BLOCK_PINK_02
  },
  식당: {
    bg: COLORS.BLOCK_ORANGE_01,
    text: COLORS.BLOCK_ORANGE_02
  },
  관광지: {
    bg: COLORS.BLOCK_PURPLE_01,
    text: COLORS.BLOCK_PURPLE_02
  },
  액티비티: {
    bg: COLORS.BLOCK_GREEN_01,
    text: COLORS.BLOCK_GREEN_02
  },
  교통: {
    bg: COLORS.PRIMARY_01,
    text: COLORS.PRIMARY_02
  },
  기타: {
    bg: COLORS.SECONDARY_01,
    text: COLORS.SECONDARY_02
  }
};
