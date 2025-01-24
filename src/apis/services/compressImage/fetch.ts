import httpClient from '@/apis/httpClient/httpClient';
import { PostImagePayload, PostImageResponse } from '@/apis/services/compressImage/type';

const compressImageServices = {
  // 질문에 대한 답변
  postImage: async (payload: PostImagePayload) => {
    const formData = new FormData();
    formData.append('file', payload);

    const response = await httpClient().post<PostImageResponse>('/api/compress-image', {
      body: formData
    });

    const blob = new Blob([response.body], { type: 'image/png' });
    const file = new File([blob], payload.name, { type: 'image/png' });
    return file;
  }
};

export default compressImageServices;
