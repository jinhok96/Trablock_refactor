import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import reviewLikeServices from '@/apis/services/review/like/fetch';

export function usePutLikeReview(reviewId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutLikeReview', reviewId] as const,
    mutationFn: () => reviewLikeServices.putLikeReview(reviewId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}
