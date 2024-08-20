import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { PatchLikeArticleResponse } from '@/apis/services/article/like/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const articleLikeServices = {
  patchLikeArticle: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchLikeArticleResponse>>(
      `/api/v1/bookmark/${articleId}`,
      {
        method: METHOD.PATCH,
        headers
      }
    );
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response;
  }
};

export default articleLikeServices;
