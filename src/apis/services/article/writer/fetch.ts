import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PatchArticlePrivacyResponse,
  PostArticlePayload,
  PostArticleResponse,
  PutArticleCoverImagePayload,
  PutArticleCoverImageResponse,
  PutArticlePayload,
  PutArticleResponse
} from '@/apis/services/article/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { throwError } from '@/apis/utils/throwError';

const articleWriterServices = {
  putArticle: async (
    articleId: number,
    payload: PutArticlePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await fetchJsonDefault<ResponseWrapper<PutArticleResponse>>(`/api/v1/article/${articleId}`, {
      method: METHOD.PUT,
      body: payload,
      headers
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    throwError(response.body.error);
    return response;
  },
  putArticleCoverImage: async (
    articleId: number,
    payload: PutArticleCoverImagePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const formData = new FormData();
    formData.append('cover_img', payload.cover_img);
    const response = await fetchJsonDefault<ResponseWrapper<PutArticleCoverImageResponse>>(
      `/api/v1/article/${articleId}/coverImg`,
      {
        method: METHOD.PUT,
        body: formData,
        headers
      }
    );
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    throwError(response.body.error);
    return response;
  },
  postArticle: async (payload: PostArticlePayload, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostArticleResponse>>('/api/v1/article', {
      method: METHOD.POST,
      body: payload,
      headers
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    throwError(response.body.error);
    return response;
  },
  patchPrivacyArticle: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchArticlePrivacyResponse>>(
      `/api/v1/articles/${articleId}/privacy`,
      {
        method: METHOD.PATCH,
        headers
      }
    );
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    throwError(response.body.error);
    return response;
  }
};

export default articleWriterServices;
