import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleWriterServices from '@/apis/services/article/writer/fetch';
import { PostArticlePayload, PutArticleCoverImagePayload } from '@/apis/services/article/writer/type';

export function usePutArticle(articleId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutArticle', articleId] as const,
    mutationFn: (payload: PostArticlePayload) => articleWriterServices.putArticle(articleId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] as const })
  });
}

export function usePutArticleCoverImage(articleId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutArticleCoverImage', articleId] as const,
    mutationFn: (payload: PutArticleCoverImagePayload) =>
      articleWriterServices.putArticleCoverImage(articleId, payload),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] })
  });
}

export function usePostArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostArticle'] as const,
    mutationFn: (payload: PostArticlePayload) => articleWriterServices.postArticle(payload),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] })
  });
}

export function usePatchPrivacyArticle(articleId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchPrivacyArticle', articleId] as const,
    mutationFn: () => articleWriterServices.patchPrivacyArticle(articleId),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE] })
  });
}
