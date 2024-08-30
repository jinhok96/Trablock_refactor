import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { PatchSignOutResponse } from '@/apis/services/user/unregistration/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { throwError } from '@/apis/utils/throwError';

const userUnregistrationServices = {
  patchSignOut: async (headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchSignOutResponse>>('/api/v1/auth/signout', {
      method: METHOD.PATCH,
      headers
    });
    throwError(response.body.error);
    return response;
  }
};

export default userUnregistrationServices;
