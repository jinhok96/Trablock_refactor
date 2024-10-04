import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PostArticlePayload,
  PostArticleResponse,
  PutArticleCoverImagePayload,
  PutArticleCoverImageResponse,
  PutArticlePayload,
  PutArticleResponse
} from '@/apis/services/article/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

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
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getBannerLikesArticleList());
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getBannerHotArticleList());
    return response;
  },
  putArticleCoverImage: async (
    articleId: number,
    payload: PutArticleCoverImagePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    const response = await fetchJsonDefault<ResponseWrapper<PutArticleCoverImageResponse>>(
      `/api/v1/article/${articleId}/coverImg`,
      {
        method: METHOD.PUT,
        body: formData,
        headers
      }
    );
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getArticle(articleId));
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getBannerLikesArticleList());
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getBannerHotArticleList());
    return response;
  },
  postArticle: async (payload: PostArticlePayload, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostArticleResponse>>('/api/v1/article', {
      method: METHOD.POST,
      body: payload,
      headers
    });
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getBannerLikesArticleList());
    handleRevalidateTag(CACHE_TAGS.ARTICLE.getBannerHotArticleList());
    return response;
  }
};

export default articleWriterServices;
