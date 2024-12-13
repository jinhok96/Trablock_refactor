import { httpClientJsonDefault } from '@/apis/httpClient/httpClientJsonDefault';
import {
  PostVerifyNicknamePayload,
  PostVerifyNicknameResponse,
  PostVerifyUsernamePayload,
  PostVerifyUsernameResponse
} from '@/apis/services/user/verification/type';
import { ResponseWrapper } from '@/apis/types/common';

const userVerificationServices = {
  postVerifyUsername: async (payload: PostVerifyUsernamePayload) => {
    const response = await httpClientJsonDefault.post<ResponseWrapper<PostVerifyUsernameResponse>>(
      '/api/v1/auth/username',
      { body: payload }
    );
    return response;
  },
  postVerifyNickname: async (payload: PostVerifyNicknamePayload) => {
    const response = await httpClientJsonDefault.post<ResponseWrapper<PostVerifyNicknameResponse>>(
      '/api/v1/auth/nickname',
      { body: payload }
    );
    return response;
  }
};

export default userVerificationServices;
