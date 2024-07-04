import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

import bookmarkService from './bookmarkFetch';

const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: number) => bookmarkService.toggleBookmark(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] as QueryKey });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] as QueryKey });
    },
    onError: (error) => {
      console.error('북마크 토글 실패:', error);
    }
  });
};

export default useToggleBookmark;
