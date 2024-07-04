'use client';

import { useMutation } from '@tanstack/react-query';

import { signupProps } from '@/apis/constants/auth.type';
import serviceSignup from '@/apis/hooks/useSignup/fetch';

export default function usePostSignup() {
  return useMutation({
    mutationKey: ['usePostSignup'],
    mutationFn: (data: signupProps) => serviceSignup.postSignup(data)
  });
}
