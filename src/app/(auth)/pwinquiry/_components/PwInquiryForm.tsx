'use client';

import { useState } from 'react';

import { PostPwInquiryVerificationPayload } from '@/apis/services/pwInquiry/type';
import RenewalForm from '@/app/(auth)/pwinquiry/_components/RenewalForm';
import UsernameForm from '@/app/(auth)/pwinquiry/_components/UsernameForm';
import VerificationForm from '@/app/(auth)/pwinquiry/_components/VerificationForm';

export const PW_INQUIRY_TYPE_QUERY = {
  VERIFICATION: 'verification',
  RENEWAL: 'renewal'
};

export type HandleSetFormData = ({
  username,
  pw_question_id,
  answer
}: Partial<PostPwInquiryVerificationPayload>) => void;

export default function PwInquiryForm() {
  const [formType, setFormType] = useState<'username' | 'verification' | 'renewal'>('username');
  const [formData, setFormData] = useState<PostPwInquiryVerificationPayload>({
    username: '',
    pw_question_id: 0,
    answer: ''
  });

  const handleSetFormTypeVerification = () => {
    setFormType('verification');
  };

  const handleSetFormTypeRenewal = () => {
    setFormType('renewal');
  };

  const handleSetFormData: HandleSetFormData = ({ username, pw_question_id, answer }) => {
    setFormData({
      username: username || formData.username,
      pw_question_id: pw_question_id || formData.pw_question_id,
      answer: answer || formData.answer
    });
  };

  if (formType === 'username')
    return <UsernameForm handleSetFormData={handleSetFormData} handleSetFormType={handleSetFormTypeVerification} />;

  if (formType === 'verification')
    return (
      <VerificationForm
        data={formData}
        handleSetFormData={handleSetFormData}
        handleSetFormType={handleSetFormTypeRenewal}
      />
    );

  if (formType === 'renewal') return <RenewalForm data={formData} />;

  return null;
}
