'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState, useMemo } from 'react';

interface LoginContextType {
  userProfileImage: string;
  setUserProfileImage: Dispatch<SetStateAction<string>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

const LoginContext = createContext<LoginContextType>({
  userProfileImage: '',
  setUserProfileImage: () => '',
  userId: '',
  setUserId: () => ''
});

function LoginContextProvider({ children }: { children: ReactNode }) {
  const [userProfileImage, setUserProfileImage] = useState('');
  const [userId, setUserId] = useState('');

  const value = useMemo(
    () => ({
      userProfileImage,
      setUserProfileImage,
      userId,
      setUserId
    }),
    [userProfileImage, userId]
  );

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export { LoginContext, LoginContextProvider };
