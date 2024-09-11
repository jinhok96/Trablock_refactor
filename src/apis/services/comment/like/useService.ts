import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import commentLikeServices from '@/apis/services/comment/like/fetch';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function usePutLikeComment(commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutLikeComment', commentId] as const,
    mutationFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return commentLikeServices.putLikeComment(commentId, headers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENT] }),
    throwOnError: true
  });
}
