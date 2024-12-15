import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import {
  PostVerifyNicknamePayload,
  PostVerifyNicknameResponse,
  PostVerifyUsernamePayload,
  PostVerifyUsernameResponse
} from '@/apis/services/user/verification/type';
import { ResponseWrapper } from '@/apis/types/common';

const userVerificationServices = {
  postVerifyUsername: async (payload: PostVerifyUsernamePayload) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostVerifyUsernameResponse>>(
      '/api/v1/auth/username',
      { body: payload }
    );
    return response;
  },
  postVerifyNickname: async (payload: PostVerifyNicknamePayload) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostVerifyNicknameResponse>>(
      '/api/v1/auth/nickname',
      { body: payload }
    );
    return response;
  }
};

export default userVerificationServices;
