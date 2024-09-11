import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import reviewWriterServices from '@/apis/services/review/writer/fetch';
import { PatchEditReviewPayload, PostReviewPayload } from '@/apis/services/review/writer/type';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function usePostReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostReview'] as const,
    mutationFn: async (payload: PostReviewPayload) => {
      const headers = await getAuthorizationTokenHeader();
      return reviewWriterServices.postReview(payload, headers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}

export function usePatchEditReview(reviewId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchEditReview', reviewId] as const,
    mutationFn: async (payload: PatchEditReviewPayload) => {
      const headers = await getAuthorizationTokenHeader();
      return reviewWriterServices.patchEditReview(reviewId, payload, headers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}

export function usePatchDeleteReview(reviewId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchDeleteReview', reviewId] as const,
    mutationFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return reviewWriterServices.patchDeleteReview(reviewId, headers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}
