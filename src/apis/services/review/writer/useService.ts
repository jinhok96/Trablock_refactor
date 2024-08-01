import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import reviewWriterServices from '@/apis/services/review/writer/fetch';
import { PatchEditReviewPayload, PostReviewPayload } from '@/apis/services/review/writer/type';

export function usePostReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostReview'] as const,
    mutationFn: (payload: PostReviewPayload) => reviewWriterServices.postReview(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] })
  });
}

export function usePatchEditReview(reviewId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchEditReview', reviewId] as const,
    mutationFn: (payload: PatchEditReviewPayload) => reviewWriterServices.patchEditReview(reviewId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] })
  });
}

export function usePatchDeleteReview(reviewId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchDeleteReview', reviewId] as const,
    mutationFn: () => reviewWriterServices.patchDeleteReview(reviewId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] })
  });
}
