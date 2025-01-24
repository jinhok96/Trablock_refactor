import { CACHE_TAGS_PREFIX } from '@/apis/constants/cacheTags';
import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import {
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
  ) => {
    const compressedFile = await compressImageServices.postImage(payload.file);
    const formData = new FormData();
    formData.append('file', compressedFile);

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
  }
};

export default articleWriterServices;
