import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { PostPwInquiryEmailPayload } from '@/apis/services/pwInquiry/type';
import { usePostPwInquiryEmail } from '@/apis/services/pwInquiry/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import { HandleSetFormData } from '@/app/(auth)/pwinquiry/_components/PwInquiryForm';
import Button from '@/components/common/buttons/Button';
import FormInput from '@/components/common/inputs/FormInput';
import { PostPwInquiryEmailPayloadForm, VALIDATE } from '@/libs/constants/validate';
import consoleLogApiResponse from '@/libs/utils/consoleLogApiResponse';

type UsernameFormProps = {
  handleSetFormData: HandleSetFormData;
  handleSetFormType: () => void;
};

export default function UsernameForm({ handleSetFormData, handleSetFormType }: UsernameFormProps) {
  const { mutate: postPwInquiryUsername } = usePostPwInquiryEmail();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PostPwInquiryEmailPayloadForm>({
    mode: 'onBlur',
    defaultValues: { username: '' }
  });

  const registerList = {
    username: register('username', VALIDATE.PW_INQUIRY_EMAIL.username)
  };

  const handlePostForm = (payload: PostPwInquiryEmailPayload) => {
    postPwInquiryUsername(payload, {
      onSuccess: (res) => {
        consoleLogApiResponse(res);
        const { data, error } = res.body;
        if (!data || error) return setError('username', { message: translateErrorCode(error?.code) });
        handleSetFormData(data);
        handleSetFormType();
      }
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(handlePostForm)(e);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <p className="font-title-4 mb-6">가입한 이메일 입력</p>
      <FormInput
        id="username"
        containerClassName="mb-10"
        labelClassName="font-subtitle-3 text-gray-01 pb-1"
        register={registerList.username}
        message={errors.username?.message}
        error={!!errors.username?.message}
        placeholder="이메일을 입력해주세요."
        autoFocus
      >
        이메일
      </FormInput>
      <Button className="btn-solid btn-md w-full" type="submit">
        입력하기
      </Button>
    </form>
  );
}
