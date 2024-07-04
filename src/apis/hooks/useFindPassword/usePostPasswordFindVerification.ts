'use client';

import { useMutation } from '@tanstack/react-query';

import serviceFindPassword from '@/apis/hooks/useFindPassword/fetch';

export default function useFindPasswordVerification() {
  return useMutation({
    mutationKey: ['useFindPasswordVerification'],
    mutationFn: (data: { username: string; pw_question_id: number; answer: string }) =>
      serviceFindPassword.postVerification(data)
  });
}
