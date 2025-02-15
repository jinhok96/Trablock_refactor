import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
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
    const response = await httpClientDefault.post<ResponseWrapper<PostPwInquiryVerificationResponse>>(
      '/api/v1/auth/pw-inquiry/verification',
      { body: payload }
    );
    return response;
  },
  // 비밀번호 갱신
  postPwInquiryRenewal: async (payload: PostPwInquiryRenewalPayload) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostPwInquiryRenewalResponse>>(
      '/api/v1/auth/pw-inquiry/renewal',
      { body: payload }
    );
    return response;
  },
  // 이메일로 질문 받기
  postPwInquiryEmail: async (payload: PostPwInquiryEmailPayload) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostPwInquiryEmailResponse>>(
      '/api/v1/auth/pw-inquiry/email',
      { body: payload }
    );
    return response;
  }
};

export default pwInquiryServices;
