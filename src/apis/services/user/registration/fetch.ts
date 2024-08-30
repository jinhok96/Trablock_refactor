import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { PostJoinPayload, PostJoinResponse } from '@/apis/services/user/registration/type';
import { ResponseWrapper } from '@/apis/types/common';
import { throwError } from '@/apis/utils/throwError';

const registrationServices = {
  postJoin: async (payload: PostJoinPayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostJoinResponse>>('/api/v1/auth/join', {
      method: METHOD.POST,
      body: payload
    });
    throwError(response.body.error);
    return response;
  }
};

export default registrationServices;
