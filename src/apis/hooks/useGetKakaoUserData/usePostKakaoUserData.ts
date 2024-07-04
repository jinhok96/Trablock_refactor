'use clinet';

import { useMutation } from '@tanstack/react-query';

import serviceKakaoUserData from './fetch';

export default function usePostKakaoUserData() {
  return useMutation({
    mutationKey: ['useGetKakaoUserData'],
    mutationFn: (token: string) => serviceKakaoUserData.postKakaoUserData(token)
  });
}
