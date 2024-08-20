import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import reviewWriterServices from '@/apis/services/review/writer/fetch';
import { PatchEditReviewPayload, PostReviewPayload } from '@/apis/services/review/writer/type';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePostReview() {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostReview'] as const,
    mutationFn: (payload: PostReviewPayload) => reviewWriterServices.postReview(payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}

export function usePatchEditReview(reviewId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchEditReview', reviewId] as const,
    mutationFn: (payload: PatchEditReviewPayload) => reviewWriterServices.patchEditReview(reviewId, payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}

export function usePatchDeleteReview(reviewId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchDeleteReview', reviewId] as const,
    mutationFn: () => reviewWriterServices.patchDeleteReview(reviewId, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW] }),
    throwOnError: true
  });
}
