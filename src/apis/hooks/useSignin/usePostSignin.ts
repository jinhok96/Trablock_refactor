'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignin from '@/apis/hooks/useSignin/fetch';
import { signinProps } from '@/apis/hooks/useSignin/type';

export default function usePostSignin() {
  return useMutation({
    mutationKey: ['usePostSignin'],
    mutationFn: (data: signinProps) => serviceSignin.postSignin(data)
  });
}
