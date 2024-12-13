import { httpClientJsonDefault } from '@/apis/httpClient/httpClientJsonDefault';
import { PatchUserUnregistrationResponse } from '@/apis/services/user/unregistration/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const userUnregistrationServices = {
  patchUserUnregistration: async (headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await httpClientJsonDefault.patch<ResponseWrapper<PatchUserUnregistrationResponse>>(
      '/api/v1/auth/signout',
      { headers }
    );
    return response;
  }
};

export default userUnregistrationServices;
