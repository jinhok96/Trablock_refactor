import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PatchSignOutResponse } from '@/apis/services/user/unregistration/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'userUnregistration'> = {
  userUnregistration: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchUserUnregistration = returnFetchJson(options.userUnregistration);

const userUnregistrationServices = {
  patchSignOut: async () => {
    const response = await fetchUserUnregistration<PatchSignOutResponse>('/api/v1/auth/signout', {
      method: METHOD.PATCH
    });
    return response.body;
  }
};

export default userUnregistrationServices;
