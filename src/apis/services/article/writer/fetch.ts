import { CACHE_TAGS_PREFIX } from '@/apis/constants/cacheTags';
import { ResponseGenericBody } from '@/apis/httpClient/httpClient';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import {
  PatchDeleteArticleResponse,
  PostArticlePayload,
  PostArticleResponse,
  PutArticleCoverImagePayload,
  PutArticleCoverImageResponse,
  PutArticlePayload,
  PutArticleResponse
} from '@/apis/services/article/writer/type';
import compressImageServices from '@/apis/services/compressImage/fetch';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

const articleWriterServices = {
  putArticle: async (
    articleId: number,
    payload: PutArticlePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await httpClientDefault.put<ResponseWrapper<PutArticleResponse>>(`/api/v1/articles/${articleId}`, {
      body: payload,
      headers
    });
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  },
  putArticleCoverImage: async (
    articleId: number,
    payload: PutArticleCoverImagePayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ): Promise<ResponseGenericBody<ResponseWrapper<PutArticleCoverImageResponse>>> => {
    const compressImageResponse = await compressImageServices.postImage(payload.file);
    const { data, error } = compressImageResponse.body;
    if (!data || error) return { ...compressImageResponse, body: { data: null, error } };

    const formData = new FormData();
    formData.append('file', data);

    const response = await httpClientDefault.put<ResponseWrapper<PutArticleCoverImageResponse>>(
      `/api/v1/articles/${articleId}/coverImg`,
      {
        body: formData,
        headers
      }
    );
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  },
  postArticle: async (payload: PostArticlePayload, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostArticleResponse>>('/api/v1/article', {
      body: payload,
      headers
    });
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  },
  patchDeleteArticle: async (articleId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await httpClientDefault.patch<ResponseWrapper<PatchDeleteArticleResponse>>(
      `/api/v1/articles/${articleId}/status`,
      { headers }
    );
    await handleRevalidateTag(CACHE_TAGS_PREFIX.ARTICLE);
    return response;
  }
};

export default articleWriterServices;
