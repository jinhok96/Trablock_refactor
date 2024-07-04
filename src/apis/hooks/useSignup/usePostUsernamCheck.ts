'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignup from '@/apis/hooks/useSignup/fetch';

export default function usePostUsernameCheck() {
  return useMutation({
    mutationKey: ['usePostUsernameCheck'],
    mutationFn: (data: string) => serviceSignup.postUsernameCheck(data)
  });
}
