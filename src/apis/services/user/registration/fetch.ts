import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PostJoinPayload, PostJoinResponse } from '@/apis/services/user/registration/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';

const options: ReturnFetchOptions<'registration'> = {
  registration: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchRegistration = returnFetchJson(options.registration);

const registrationServices = {
  postJoin: async (payload: PostJoinPayload) => {
    const response = await fetchRegistration<ResponseWrapper<PostJoinResponse>>('/api/v1/auth/join', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  }
};

export default registrationServices;
