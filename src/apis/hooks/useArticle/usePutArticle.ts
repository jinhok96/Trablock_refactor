import { QueryClient, useMutation } from '@tanstack/react-query';

import { ArticleFormData } from './article.type';
import ArticleService from './fetch';

export default function usePutArticle(articleId: string) {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (data: ArticleFormData) => ArticleService.putArticle(articleId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trablock', 'article', 'useGetArticle', articleId] })
  });
}
