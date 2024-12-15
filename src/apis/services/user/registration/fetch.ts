import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import { PostJoinPayload, PostJoinResponse } from '@/apis/services/user/registration/type';
import { ResponseWrapper } from '@/apis/types/common';

const registrationServices = {
  postJoin: async (payload: PostJoinPayload) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostJoinResponse>>('/api/v1/auth/join', {
      body: payload
    });
    return response;
  }
};

export default registrationServices;
