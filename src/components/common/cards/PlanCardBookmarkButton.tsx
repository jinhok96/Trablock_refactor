import { MouseEventHandler, useState } from 'react';

import { usePatchLikeArticle } from '@/apis/services/article/like/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import BookmarkButton from '@/components/common/buttons/BookmarkButton';
import useToast from '@/libs/hooks/useToast';

export type PlanCardBookmarkButtonProps = {
  articleId: number;
  initIsBookmarked: boolean | undefined;
  bookmarkCount: number;
  onBookmarkCountUpdate?: (bookmarkCount: number) => void;
};

export default function PlanCardBookmarkButton({
  articleId,
  initIsBookmarked,
  bookmarkCount,
  onBookmarkCountUpdate
}: PlanCardBookmarkButtonProps) {
  const { showToast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(initIsBookmarked);
  const { mutate: patchBookmarkArticle, isPending: patchBookmarkArticleLoading } = usePatchLikeArticle();

  const handleToggleBookmark: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    patchBookmarkArticle(articleId, {
      onSuccess: (res) => {
        const { data, error } = res.body;
        if (!data || error) {
          const message = translateErrorCode(error?.code);
          return showToast(message, 'error');
        }
        const bookmarkStatus = data.status === 'ACTIVE' ? true : false;
        setIsBookmarked(bookmarkStatus);
        onBookmarkCountUpdate?.(bookmarkStatus ? bookmarkCount + 1 : bookmarkCount - 1);
      }
    });
  };

  return (
    <BookmarkButton
      containerClassName="absolute right-3 top-3 bg-white-01 rounded-md hover:bg-primary-02 shadow-button md:right-4 md:top-4"
      className="size-8 p-1.5"
      onClick={handleToggleBookmark}
      isBookmarked={isBookmarked}
      isLoading={patchBookmarkArticleLoading}
    />
  );
}
