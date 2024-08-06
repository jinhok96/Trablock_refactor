import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  PostVerifyNicknamePayload,
  PostVerifyNicknameResponse,
  PostVerifyUsernamePayload,
  PostVerifyUsernameResponse
} from '@/apis/services/user/verification/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';

const options: ReturnFetchOptions<'userVerification'> = {
  userVerification: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchUserVerification = returnFetchJson(options.userVerification);

const userVerificationServices = {
  postVerifyUsername: async (payload: PostVerifyUsernamePayload) => {
    const response = await fetchUserVerification<ResponseWrapper<PostVerifyUsernameResponse>>('/api/v1/auth/username', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  },
  postVerifyNickname: async (payload: PostVerifyNicknamePayload) => {
    const response = await fetchUserVerification<ResponseWrapper<PostVerifyNicknameResponse>>('/api/v1/auth/nickname', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  }
};

export default userVerificationServices;
