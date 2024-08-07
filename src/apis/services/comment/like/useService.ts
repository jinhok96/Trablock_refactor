import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import commentLikeServices from '@/apis/services/comment/like/fetch';

export function usePutLikeComment(commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutLikeComment', commentId] as const,
    mutationFn: () => commentLikeServices.putLikeComment(commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENT] }),
    throwOnError: true
  });
}
