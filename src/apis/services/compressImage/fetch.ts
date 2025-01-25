import { ERROR_CODES } from '@/apis/constants/errorCodes';
import httpClient, { ResponseGenericBody } from '@/apis/httpClient/httpClient';
import { PostCompressImageResponse, PostImagePayload, PostImageResponse } from '@/apis/services/compressImage/type';
import { ResponseWrapper } from '@/apis/types/common';

const compressImageServices = {
  postImage: async (payload: PostImagePayload): Promise<ResponseGenericBody<ResponseWrapper<PostImageResponse>>> => {
    const formData = new FormData();
    formData.append('file', payload);

    const response = await httpClient().post<PostCompressImageResponse>('/api/compress-image', {
      body: formData
    });

    const bodyData: ResponseWrapper<PostImageResponse> = {
      data: null,
      error: null
    };

    if (!response.body) {
      bodyData.error = {
        code: 110001,
        local_message: ERROR_CODES[110001],
        field_errors: {}
      };
      return { ...response, body: bodyData };
    }

    if (!(response.body instanceof Blob)) {
      bodyData.error = {
        code: 110001,
        local_message: ERROR_CODES[110001],
        field_errors: {}
      };
      return { ...response, body: bodyData };
    }

    if (response.body.size >= 5 * 1024 * 1024) {
      bodyData.error = {
        code: 110002,
        local_message: ERROR_CODES[110002],
        field_errors: {}
      };
      return { ...response, body: bodyData };
    }

    const file = new File([response.body], payload.name, { type: 'image/jpeg' });
    bodyData.data = file;

    return { ...response, body: bodyData };
  }
};

export default compressImageServices;
