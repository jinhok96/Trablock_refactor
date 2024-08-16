'use client';

import { HTMLAttributes, ReactNode, createContext, useMemo, useState } from 'react';

import { PostLoginResponse } from '@/apis/services/user/authentication/type';

type UpdateUserData = (userData: PostLoginResponse) => void;
type UserDataStateContextType = PostLoginResponse | null;
type UserDataDispatchContextType = { update: UpdateUserData };
type UserDataProviderProps = HTMLAttributes<ReactNode>;

// Context
export const UserDataStateContext = createContext<UserDataStateContextType>(null);
export const UserDataDispatchContext = createContext<UserDataDispatchContextType>({
  update: () => {}
});

// Provider
export function UserDataProvider({ children }: UserDataProviderProps) {
  const [userData, setUserData] = useState<UserDataStateContextType>(null);

  const update: UpdateUserData = (userData: PostLoginResponse) => {
    setUserData(userData);
  };

  const dispatch = useMemo(() => ({ update }), [update]);

  return (
    <UserDataStateContext.Provider value={userData}>
      <UserDataDispatchContext.Provider value={dispatch}>{children}</UserDataDispatchContext.Provider>
    </UserDataStateContext.Provider>
  );
}
