'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';

import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';

export type UserData = GetUserProfileResponse & { userId: number };

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

  const dispatch = useMemo(() => ({ set, clear }), [set, clear]);

  return (
    <UserDataStateContext.Provider value={userData}>
      <UserDataDispatchContext.Provider value={dispatch}>{children}</UserDataDispatchContext.Provider>
    </UserDataStateContext.Provider>
  );
}
