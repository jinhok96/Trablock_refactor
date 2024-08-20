import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleLikeServices from '@/apis/services/article/like/fetch';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePatchLikeArticle() {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchLikeArticle'] as const,
    mutationFn: (articleId: number) => articleLikeServices.patchLikeArticle(articleId, headers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] as const });
    },
    throwOnError: true
  });
}
