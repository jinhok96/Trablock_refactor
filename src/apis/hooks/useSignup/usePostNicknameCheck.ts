'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignup from '@/apis/hooks/useSignup/fetch';

export default function usePostNicknameCheck() {
  return useMutation({
    mutationKey: ['usePostNicknameCheck'],
    mutationFn: (data: string) => serviceSignup.postNicknameCheck(data)
  });
}
