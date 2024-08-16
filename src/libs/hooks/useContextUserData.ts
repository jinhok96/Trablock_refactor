import { useContext } from 'react';

import { UserDataDispatchContext, UserDataStateContext } from '@/libs/contexts/UserDataContextProvider';

export default function useContextUserData() {
  const userDataState = useContext(UserDataStateContext);
  const userData = userDataState || null;
  const { update: updateUserData } = useContext(UserDataDispatchContext);
  return { userData, updateUserData };
}
