import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  PatchArticlePrivacyResponse,
  PostArticlePayload,
  PostArticleResponse,
  PutArticleCoverImagePayload,
  PutArticleCoverImageResponse,
  PutArticlePayload,
  PutArticleResponse
} from '@/apis/services/article/writer/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'articleWriter' | 'coverImage'> = {
  articleWriter: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  },
  coverImage: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchArticleWriter = returnFetchJson(options.articleWriter);
const fetchCoverImage = returnFetchJson(options.coverImage);

const articleWriterServices = {
  putArticle: async (articleId: number, payload: PutArticlePayload) => {
    const response = await fetchArticleWriter<PutArticleResponse>(`/api/v1/article/${articleId}`, {
      method: METHOD.PUT,
      body: payload
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response.body;
  },
  putArticleCoverImage: async (articleId: number, payload: PutArticleCoverImagePayload) => {
    const formData = new FormData();
    formData.append('cover_img', payload.cover_img);
    const response = await fetchCoverImage<PutArticleCoverImageResponse>(`/api/v1/article/${articleId}/coverImg`, {
      method: METHOD.PUT,
      body: formData
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response.body;
  },
  postArticle: async (payload: PostArticlePayload) => {
    const response = await fetchArticleWriter<PostArticleResponse>('/api/v1/article', {
      method: METHOD.POST,
      body: payload
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response.body;
  },
  patchPrivacyArticle: async (articleId: number) => {
    const response = await fetchArticleWriter<PatchArticlePrivacyResponse>(`/api/v1/articles/${articleId}/privacy`, {
      method: METHOD.PATCH
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response.body;
  }
};

export default articleWriterServices;
