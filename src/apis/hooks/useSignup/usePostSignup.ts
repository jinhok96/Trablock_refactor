'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignup from '@/apis/hooks/useSignup/fetch';
import { signupProps } from '@/apis/hooks/useSignup/type';

export default function usePostSignup() {
  return useMutation({
    mutationKey: ['usePostSignup'],
    mutationFn: (data: signupProps) => serviceSignup.postSignup(data)
  });
}
