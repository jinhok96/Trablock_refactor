import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleWriterServices from '@/apis/services/article/writer/fetch';
import { PostArticlePayload, PutArticleCoverImagePayload } from '@/apis/services/article/writer/type';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function usePutArticle(articleId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutArticle', articleId] as const,
    mutationFn: (payload: PostArticlePayload) => articleWriterServices.putArticle(articleId, payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] as const }),
    throwOnError: true
  });
}

export function usePutArticleCoverImage(articleId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutArticleCoverImage', articleId] as const,
    mutationFn: (payload: PutArticleCoverImagePayload) =>
      articleWriterServices.putArticleCoverImage(articleId, payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] }),
    throwOnError: true
  });
}

export function usePostArticle() {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostArticle'] as const,
    mutationFn: (payload: PostArticlePayload) => articleWriterServices.postArticle(payload, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] }),
    throwOnError: true
  });
}

export function usePatchPrivacyArticle(articleId: number) {
  const queryClient = useQueryClient();
  const headers = getAuthorizationTokenHeader();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchPrivacyArticle', articleId] as const,
    mutationFn: () => articleWriterServices.patchPrivacyArticle(articleId, headers),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] }),
    throwOnError: true
  });
}
