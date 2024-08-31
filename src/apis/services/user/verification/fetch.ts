import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PostVerifyNicknamePayload,
  PostVerifyNicknameResponse,
  PostVerifyUsernamePayload,
  PostVerifyUsernameResponse
} from '@/apis/services/user/verification/type';
import { ResponseWrapper } from '@/apis/types/common';

const userVerificationServices = {
  postVerifyUsername: async (payload: PostVerifyUsernamePayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostVerifyUsernameResponse>>('/api/v1/auth/username', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  },
  postVerifyNickname: async (payload: PostVerifyNicknamePayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostVerifyNicknameResponse>>('/api/v1/auth/nickname', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  }
};

export default userVerificationServices;
