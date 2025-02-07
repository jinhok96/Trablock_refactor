import { BaseArticle, OptionalArticle } from '@/apis/services/article/reader/type';
import { PlanCardBookmarkButtonProps } from '@/components/common/cards/PlanCardBookmarkButton';
import { PlanCardDropdownProps } from '@/components/common/cards/PlanCardDropdown';
import { PlanCardInfoProps } from '@/components/common/cards/PlanCardInfo';
import { NextImageProps } from '@/components/common/images/types';

export type PlanCardArticle = BaseArticle & Partial<OptionalArticle>;

export interface PlanCardShapeProps
  extends Pick<NextImageProps, 'src' | 'priority'>,
    Pick<PlanCardBookmarkButtonProps, 'initIsBookmarked' | 'onBookmarkCountUpdate'>,
    Pick<PlanCardInfoProps, 'article' | 'hideBookmark'>,
    PlanCardDropdownProps {
  className?: string;
  articleId: number;
  userId: number;
  isEditable: boolean | undefined | null;
  bookmarkCount: number;
}
