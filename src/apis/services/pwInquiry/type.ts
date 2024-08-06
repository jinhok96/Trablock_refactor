//payload
export type PostPwInquiryVerificationPayload = {
  username: string;
  pw_question_id: number;
  answer: string;
};
export type PostPwInquiryRenewalPayload = {
  username: string;
  password: string;
  pw_question_id: number;
  answer: string;
};
export type PostPwInquiryEmailPayload = {
  username: string;
};

//response
export type PostPwInquiryVerificationResponse = {
  username: string;
  pw_question_id: number;
  answer: string;
};
export type PostPwInquiryRenewalResponse = {
  is_renewal: boolean;
};
export type PostPwInquiryEmailResponse = {
  username: string;
  pw_question_id: number;
};
