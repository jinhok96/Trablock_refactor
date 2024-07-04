'use client';

import { useMutation } from '@tanstack/react-query';

import serviceKakaoLogin from '@/apis/hooks/usePostKakao/fetch';

export default function usePostKakaoToken() {
  return useMutation({
    mutationKey: ['usePostKakaoToken'],
    mutationFn: (code: string) => serviceKakaoLogin.postKakaoToken(code)
  });
}
