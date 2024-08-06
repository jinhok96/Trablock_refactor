import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  PostPwInquiryEmailPayload,
  PostPwInquiryEmailResponse,
  PostPwInquiryRenewalPayload,
  PostPwInquiryRenewalResponse,
  PostPwInquiryVerificationPayload,
  PostPwInquiryVerificationResponse
} from '@/apis/services/pwInquiry/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';

const options: ReturnFetchOptions<'pwInquiry'> = {
  pwInquiry: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchPwInquiry = returnFetchJson(options.pwInquiry);

const pwInquiryServices = {
  // 질문에 대한 답변
  postPwInquiryVerification: async (payload: PostPwInquiryVerificationPayload) => {
    const response = await fetchPwInquiry<ResponseWrapper<PostPwInquiryVerificationResponse>>(
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
    const response = await fetchPwInquiry<ResponseWrapper<PostPwInquiryRenewalResponse>>(
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
    const response = await fetchPwInquiry<ResponseWrapper<PostPwInquiryEmailResponse>>(
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
