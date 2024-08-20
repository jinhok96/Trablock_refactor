import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import commentLikeServices from '@/apis/services/comment/like/fetch';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePutLikeComment(commentId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutLikeComment', commentId] as const,
    mutationFn: () => commentLikeServices.putLikeComment(commentId, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENT] }),
    throwOnError: true
  });
}
