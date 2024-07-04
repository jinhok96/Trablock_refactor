'use client';

import { useMutation } from '@tanstack/react-query';

import serviceFindPassword from '@/apis/hooks/useFindPassword/fetch';

export default function useFindPasswordRenewal() {
  return useMutation({
    mutationKey: ['useFindPasswordRenewal'],
    mutationFn: (data: { username: string; password: string; pw_question_id: number; answer: string }) =>
      serviceFindPassword.postRenewal(data)
  });
}
