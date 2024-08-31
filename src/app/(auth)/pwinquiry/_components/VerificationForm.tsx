import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { DEFAULT_ERROR_MESSAGE } from '@/apis/constants/errorCodes';
import { PostPwInquiryEmailResponse, PostPwInquiryVerificationPayload } from '@/apis/services/pwInquiry/type';
import { usePostPwInquiryVerification } from '@/apis/services/pwInquiry/useService';
import { HandleSetFormData } from '@/app/(auth)/pwinquiry/_components/PwInquiryForm';
import Button from '@/components/common/buttons/Button';
import AuthInput from '@/components/common/inputs/AuthInput';
import { PW_QUESTION_DROPDOWN_LIST } from '@/libs/constants/pwQuestionDropdownList';
import { PostPwInquiryVerificationPayloadForm, VALIDATE } from '@/libs/constants/validate';
import consoleLogApiResponse from '@/libs/utils/consoleLogApiResponse';

type VerificationFormProps = {
  data: PostPwInquiryEmailResponse;
  handleSetFormData: HandleSetFormData;
  handleSetFormType: () => void;
};

export default function VerificationForm({ data, handleSetFormData, handleSetFormType }: VerificationFormProps) {
  const { mutate: postPwInquiryVerification } = usePostPwInquiryVerification();
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PostPwInquiryVerificationPayloadForm>({
    mode: 'onBlur',
    defaultValues: {
      username: data.username,
      pw_question_id: data.pw_question_id,
      answer: ''
    }
  });

  const registerList = {
    answer: register('answer', VALIDATE.PW_INQUIRY_VERIFICATION.answer)
  };

  const handlePostForm = () => {
    const { username, pw_question_id, answer } = getValues();
    const postPwInquiryVerificationPayload: PostPwInquiryVerificationPayload = { username, pw_question_id, answer };
    postPwInquiryVerification(postPwInquiryVerificationPayload, {
      onSuccess: (res) => {
        consoleLogApiResponse(res);
        const { data } = res.body;
        if (!data) return setError('answer', { message: DEFAULT_ERROR_MESSAGE });
        handleSetFormData(data);
        handleSetFormType();
      },
      onError: (error) => {
        setError('answer', error);
      }
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(handlePostForm)(e);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <p className="font-title-4 mb-6">비밀번호 찾기 답변 입력</p>
      <AuthInput
        containerClassName="mb-4"
        value={PW_QUESTION_DROPDOWN_LIST.find((item) => item.inputKey === data.pw_question_id)?.displayValue}
        disabled
      >
        질문
      </AuthInput>
      <AuthInput
        id="answer"
        containerClassName="mb-6"
        register={registerList.answer}
        message={errors.answer?.message}
        error={!!errors.answer?.message}
        placeholder="답변을 입력해주세요."
        autoFocus
      >
        답변
      </AuthInput>
      <Button className="btn-solid btn-md w-full" type="submit">
        입력하기
      </Button>
    </form>
  );
}
