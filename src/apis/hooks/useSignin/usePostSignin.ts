'use client';

import { useMutation } from '@tanstack/react-query';

import { signinProps } from '@/apis/constants/auth.type';
import serviceSignin from '@/apis/hooks/useSignin/fetch';

export default function usePostSignin() {
  return useMutation({
    mutationKey: ['usePostSignin'],
    mutationFn: (data: signinProps) => serviceSignin.postSignin(data)
  });
}
