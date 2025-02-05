'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { getAuthorizationTokenHeader, getUserId } from '@/app/actions/cookieActions';

export type UserData = Omit<GetUserProfileResponse, 'is_editable'> & { userId: number };

export type UserDataStateContextType = UserData | null;
type UserDataDispatchContextType = {
  set: (userData: UserData) => void;
  clear: () => void;
};

export const UserDataStateContext = createContext<UserDataStateContextType>(null);
export const UserDataDispatchContext = createContext<UserDataDispatchContextType>({
  set: () => {},
  clear: () => {}
});

type UserDataProviderProps = {
  children: ReactNode;
  initUserData: UserDataStateContextType;
};

export function UserDataProvider({ children, initUserData }: UserDataProviderProps) {
  const [userData, setUserData] = useState<UserDataStateContextType>(initUserData);

  const set = (userData: UserData) => {
    setUserData(userData);
  };

  const clear = () => {
    setUserData(null);
  };

  const dispatch: UserDataDispatchContextType = { set, clear };

  useEffect(() => {
    const getUserDataOnLoad = async () => {
      if (initUserData) return;

      const userId = await getUserId();
      const headers = await getAuthorizationTokenHeader();

      if (!userId) return;
      if (userId === userData?.userId) return;

      const { body } = await userProfileReaderServices.getUserProfile(userId, headers);
      if (!body.data) return;

      set({ userId, ...body.data });
    };

    getUserDataOnLoad();
  }, []);

  return (
    <UserDataStateContext.Provider value={userData}>
      <UserDataDispatchContext.Provider value={dispatch}>{children}</UserDataDispatchContext.Provider>
    </UserDataStateContext.Provider>
  );
}
