import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PatchLikeArticleResponse } from '@/apis/services/article/like/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'articleLike'> = {
  articleLike: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchArticleLike = returnFetchJson(options.articleLike);

const articleLikeServices = {
  patchLikeArticle: async (articleId: number) => {
    const response = await fetchArticleLike<PatchLikeArticleResponse>(`/api/v1/bookmark/${articleId}`, {
      method: METHOD.PATCH
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response.body;
  }
};

export default articleLikeServices;
