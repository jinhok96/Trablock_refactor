import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleLikeServices from '@/apis/services/article/like/fetch';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function usePatchLikeArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchLikeArticle'] as const,
    mutationFn: async (articleId: number) => {
      const headers = await getAuthorizationTokenHeader();
      return articleLikeServices.patchLikeArticle(articleId, headers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] as const });
    },
    throwOnError: true
  });
}
