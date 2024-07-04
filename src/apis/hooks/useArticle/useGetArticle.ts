import { useQuery } from '@tanstack/react-query';

import ArticleService from './fetch';

export default function useGetArticle(articleId?: string) {
  return useQuery({
    queryKey: ['trablock', 'article', 'useGetArticle', articleId],
    queryFn: () => ArticleService.getArticle(articleId),
    enabled: !!articleId
  });
}
