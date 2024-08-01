import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import userVerificationServices from '@/apis/services/user/verification/fetch';
import { PostVerifyNicknamePayload, PostVerifyUsernamePayload } from '@/apis/services/user/verification/type';

export function usePostVerifyUsername() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostVerifyUsername'] as const,
    mutationFn: (payload: PostVerifyUsernamePayload) => userVerificationServices.postVerifyUsername(payload)
  });
}

export function usePostVerifyNickname() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostVerifyNickname'] as const,
    mutationFn: (payload: PostVerifyNicknamePayload) => userVerificationServices.postVerifyNickname(payload)
  });
}
