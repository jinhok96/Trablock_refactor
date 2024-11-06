'use client';

import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { useGetUserProfileMutation } from '@/apis/services/userProfile/reader/useService';
import { getUserId } from '@/app/actions/cookieActions';

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
};

export function UserDataProvider({ children }: UserDataProviderProps) {
  const [userData, setUserData] = useState<UserDataStateContextType>(null);
  const { mutate } = useGetUserProfileMutation();

  const set = (userData: UserData) => {
    setUserData(userData);
  };

  const clear = () => {
    setUserData(null);
  };

  const dispatch = useMemo(() => ({ set, clear }), [set, clear]);

  useEffect(() => {
    const getUserDataOnLoad = async () => {
      const userId = await getUserId();

      if (!userId) return;
      if (userId === userData?.userId) return;

      mutate(userId, {
        onSuccess: (res) => {
          const data = res.body.data;
          if (!data) return;
          set({ userId, ...data });
        }
      });
    };

    getUserDataOnLoad();
  }, []);

  return (
    <UserDataStateContext.Provider value={userData}>
      <UserDataDispatchContext.Provider value={dispatch}>{children}</UserDataDispatchContext.Provider>
    </UserDataStateContext.Provider>
  );
}
