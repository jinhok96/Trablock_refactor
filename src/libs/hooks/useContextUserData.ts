import { useContext } from 'react';

import { ResponseGenericBody } from '@/apis/httpClient/httpClient';
import { PostLoginResponse } from '@/apis/services/user/authentication/type';
import { useGetUserProfileMutation } from '@/apis/services/userProfile/reader/useService';
import { ResponseWrapper } from '@/apis/types/common';
import { getUserId } from '@/app/actions/cookieActions';
import { UserDataDispatchContext, UserDataStateContext } from '@/libs/contexts/UserDataContext';
import { deleteCookieAuthToken, setCookieAuthToken } from '@/libs/utils/cookies/cookieAuthToken';

export default function useContextUserData() {
  const userData = useContext(UserDataStateContext);
  const { set, clear } = useContext(UserDataDispatchContext);
  const { mutateAsync } = useGetUserProfileMutation();

  const login = async (loginRes: ResponseGenericBody<ResponseWrapper<PostLoginResponse>>, isAutoLogin: boolean) => {
    const loginData = loginRes.body.data;
    if (!loginData) return;

    await setCookieAuthToken(loginRes, isAutoLogin);

    const { user_id: userId } = loginData;
    const res = await mutateAsync(userId);
    const userData = res.body.data;
    if (!userData) return;

    set({ userId, ...userData });
  };

  const logout = async () => {
    clear();
    await deleteCookieAuthToken();
  };

  const update = async () => {
    const userId = await getUserId();
    if (!userId) return;

    const res = await mutateAsync(userId);
    const userData = res.body.data;
    if (!userData) return;

    set({ userId, ...userData });
  };

  return { userData, login, logout, update };
}
