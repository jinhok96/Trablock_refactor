import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { PostPwInquiryRenewalPayload, PostPwInquiryVerificationResponse } from '@/apis/services/pwInquiry/type';
import { usePostPwInquiryRenewal } from '@/apis/services/pwInquiry/useService';
import Button from '@/components/common/buttons/Button';
import AuthInput from '@/components/common/inputs/AuthInput';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { PostPwInquiryRenewalPayloadForm, VALIDATE } from '@/libs/constants/validate';
import useToast from '@/libs/hooks/useToast';
import consoleLogApiResponse from '@/libs/utils/consoleLogApiResponse';

type RenewalFormProps = {
  data: PostPwInquiryVerificationResponse;
};

export default function RenewalForm({ data }: RenewalFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { showToast } = useToast();
  const { mutate: postPwInquiryRenewal } = usePostPwInquiryRenewal();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<PostPwInquiryRenewalPayloadForm>({
    mode: 'onBlur',
    defaultValues: {
      username: data.username,
      password: '',
      password_check: '',
      pw_question_id: data.pw_question_id,
      answer: data.answer
    }
  });

  const registerList = {
    password: register('password', VALIDATE.PW_INQUIRY_RENEWAL.password),
    password_check: register('password_check', VALIDATE.PW_INQUIRY_RENEWAL.password_check)
  };

  const handlePostForm = () => {
    const { username, password, pw_question_id, answer } = getValues();
    const postPwInquiryRenewalPayload: PostPwInquiryRenewalPayload = {
      username,
      password,
      pw_question_id,
      answer
    };
    postPwInquiryRenewal(postPwInquiryRenewalPayload, {
      onSuccess: (res) => {
        consoleLogApiResponse(res);
        const { data, error } = res.body;
        if (!data || error) return showToast(<span className="text-red-01">비밀번호 변경에 실패했습니다.</span>);
        showToast(<span className="text-primary-01">비밀번호 변경 성공!</span>);
        const nextPath = params.get(APP_QUERIES.NEXT) || '';
        const nextParam = nextPath ? `?${APP_QUERIES.NEXT}=${nextPath}` : '';
        router.push(APP_URLS.LOGIN + nextParam);
      }
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(handlePostForm)(e);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <p className="font-title-4 mb-6">새로운 비밀번호 입력</p>
      <AuthInput
        id="password"
        containerClassName="mb-4"
        type="password"
        register={registerList.password}
        error={errors.password?.message}
        placeholder="비밀번호를 입력해주세요."
        autoFocus
      >
        비밀번호
      </AuthInput>
      <AuthInput
        id="password_check"
        containerClassName="mb-6"
        type="password"
        register={registerList.password_check}
        error={errors.password_check?.message}
        placeholder="비밀번호 확인을 입력해주세요."
      >
        비밀번호 확인
      </AuthInput>
      <Button className="btn-solid btn-md w-full" type="submit">
        입력하기
      </Button>
    </form>
  );
}
