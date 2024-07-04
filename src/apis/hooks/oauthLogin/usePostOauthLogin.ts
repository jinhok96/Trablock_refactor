'use client';

import { useMutation } from '@tanstack/react-query';

import serviceOauth from '@/apis/hooks/oauthLogin/fetch';
import { oauthProps } from '@/apis/hooks/oauthLogin/oauth.type';

export default function usePostOauthLogin() {
  return useMutation({
    mutationKey: ['usePostOauthLogin'],
    mutationFn: (data: oauthProps) => serviceOauth.postOauthLogin(data)
  });
}
