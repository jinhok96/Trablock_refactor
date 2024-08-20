import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import reviewLikeServices from '@/apis/services/review/like/fetch';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePutLikeReview(reviewId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutLikeReview', reviewId] as const,
    mutationFn: () => reviewLikeServices.putLikeReview(reviewId, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}
