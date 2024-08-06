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
import { ResponseWrapper } from '@/apis/types/common';
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
    const response = await fetchArticleWriter<ResponseWrapper<PutArticleResponse>>(`/api/v1/article/${articleId}`, {
      method: METHOD.PUT,
      body: payload
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response;
  },
  putArticleCoverImage: async (articleId: number, payload: PutArticleCoverImagePayload) => {
    const formData = new FormData();
    formData.append('cover_img', payload.cover_img);
    const response = await fetchCoverImage<ResponseWrapper<PutArticleCoverImageResponse>>(
      `/api/v1/article/${articleId}/coverImg`,
      {
        method: METHOD.PUT,
        body: formData
      }
    );
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response;
  },
  postArticle: async (payload: PostArticlePayload) => {
    const response = await fetchArticleWriter<ResponseWrapper<PostArticleResponse>>('/api/v1/article', {
      method: METHOD.POST,
      body: payload
    });
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response;
  },
  patchPrivacyArticle: async (articleId: number) => {
    const response = await fetchArticleWriter<ResponseWrapper<PatchArticlePrivacyResponse>>(
      `/api/v1/articles/${articleId}/privacy`,
      {
        method: METHOD.PATCH
      }
    );
    revalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    revalidateTag(CACHE_TAGS.ARTICLE.getBannerArticleList());
    revalidateTag(CACHE_TAGS.ARTICLE.getAuthBannerArticleList());
    return response;
  }
};

export default articleWriterServices;
