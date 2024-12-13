import { httpClientJsonDefault } from '@/apis/httpClient/httpClientJsonDefault';
import { PostJoinPayload, PostJoinResponse } from '@/apis/services/user/registration/type';
import { ResponseWrapper } from '@/apis/types/common';

const registrationServices = {
  postJoin: async (payload: PostJoinPayload) => {
    const response = await httpClientJsonDefault.post<ResponseWrapper<PostJoinResponse>>('/api/v1/auth/join', {
      body: payload
    });
    return response;
  }
};

export default registrationServices;
