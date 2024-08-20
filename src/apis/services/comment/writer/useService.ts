import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import commentWriterServices from '@/apis/services/comment/writer/fetch';
import { PatchEditCommentPayload, PostCommentPayload } from '@/apis/services/comment/writer/type';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePostComment() {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostComment'] as const,
    mutationFn: (payload: PostCommentPayload) => commentWriterServices.postComment(payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENT] }),
    throwOnError: true
  });
}

export function usePatchEditComment(commentId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchEditComment', commentId] as const,
    mutationFn: (payload: PatchEditCommentPayload) =>
      commentWriterServices.patchEditComment(commentId, payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENT] }),
    throwOnError: true
  });
}

export function usePatchDeleteComment(commentId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchDeleteComment', commentId] as const,
    mutationFn: () => commentWriterServices.patchDeleteComment(commentId, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENT] }),
    throwOnError: true
  });
}
