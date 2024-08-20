import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PostPwInquiryEmailPayload,
  PostPwInquiryEmailResponse,
  PostPwInquiryRenewalPayload,
  PostPwInquiryRenewalResponse,
  PostPwInquiryVerificationPayload,
  PostPwInquiryVerificationResponse
} from '@/apis/services/pwInquiry/type';
import { ResponseWrapper } from '@/apis/types/common';

const pwInquiryServices = {
  // 질문에 대한 답변
  postPwInquiryVerification: async (payload: PostPwInquiryVerificationPayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostPwInquiryVerificationResponse>>(
      '/api/v1/auth/pw-inquiry/verification',
      {
        method: METHOD.POST,
        body: payload
      }
    );
    return response;
  },
  // 비밀번호 갱신
  postPwInquiryRenewal: async (payload: PostPwInquiryRenewalPayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostPwInquiryRenewalResponse>>(
      '/api/v1/auth/pw-inquiry/renewal',
      {
        method: METHOD.POST,
        body: payload
      }
    );
    return response;
  },
  // 이메일로 질문 받기
  postPwInquiryEmail: async (payload: PostPwInquiryEmailPayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostPwInquiryEmailResponse>>(
      '/api/v1/auth/pw-inquiry/email',
      {
        method: METHOD.POST,
        body: payload
      }
    );
    return response;
  }
};

export default pwInquiryServices;
