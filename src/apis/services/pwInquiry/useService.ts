import { useMutation } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import pwInquiryServices from '@/apis/services/pwInquiry/fetch';
import {
  PostPwInquiryEmailPayload,
  PostPwInquiryRenewalPayload,
  PostPwInquiryVerificationPayload
} from '@/apis/services/pwInquiry/type';

export function usePostPwInquiryVerification() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostPwInquiryVerification'],
    mutationFn: (payload: PostPwInquiryVerificationPayload) => pwInquiryServices.postPwInquiryVerification(payload)
  });
}

export function usePostPwInquiryRenewal() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostPwInquiryRenewal'],
    mutationFn: (payload: PostPwInquiryRenewalPayload) => pwInquiryServices.postPwInquiryRenewal(payload)
  });
}

export function usePostPwInquiryEmail() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostPwInquiryEmail'],
    mutationFn: (payload: PostPwInquiryEmailPayload) => pwInquiryServices.postPwInquiryEmail(payload)
  });
}
