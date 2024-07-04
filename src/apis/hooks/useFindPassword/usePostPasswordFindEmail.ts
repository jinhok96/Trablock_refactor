'use client';

import { useMutation } from '@tanstack/react-query';

import serviceFindPassword from '@/apis/hooks/useFindPassword/fetch';

export default function useFindPasswordEmail() {
  return useMutation({
    mutationKey: ['useFindPasswordEmail'],
    mutationFn: (username: string) => serviceFindPassword.postEmail(username)
  });
}
