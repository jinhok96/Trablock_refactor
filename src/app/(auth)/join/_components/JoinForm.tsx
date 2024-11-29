'use client';

import { FormEvent, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { PostJoinPayload } from '@/apis/services/user/registration/type';
import { usePostJoin } from '@/apis/services/user/registration/useService';
import { usePostVerifyNickname, usePostVerifyUsername } from '@/apis/services/user/verification/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import Button from '@/components/common/buttons/Button';
import CheckboxInput from '@/components/common/inputs/CheckboxInput';
import FormInput from '@/components/common/inputs/FormInput';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { PW_QUESTION_DROPDOWN_LIST } from '@/libs/constants/pwQuestionDropdownList';
import { PostJoinPayloadForm, VALIDATE } from '@/libs/constants/validate';
import useToast from '@/libs/hooks/useToast';
import consoleLogApiResponse from '@/libs/utils/consoleLogApiResponse';

type LoginFormProps = HTMLAttributes<HTMLFormElement>;

export default function JoinForm({ ...restFormProps }: LoginFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { showToast } = useToast();
  const { mutate: postJoin } = usePostJoin();
  const { mutate: postVerifyNickname } = usePostVerifyNickname();
  const { mutate: postVerifyUsername } = usePostVerifyUsername();
  const [verify, setVerify] = useState({
    nickname: {
      value: '',
      verified: false,
      message: ''
    },
    username: {
      value: '',
      verified: false,
      message: ''
    }
  });

  const defaultValues: PostJoinPayloadForm = {
    nickname: '',
    username: '',
    password: '',
    password_check: '',
    pw_question_id: 1,
    pw_answer: '',
    is_agreement: false
  };

  const {
    register,
    getValues,
    watch,
    trigger,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PostJoinPayloadForm>({
    mode: 'onChange',
    defaultValues
  });

  const registerList = {
    nickname: register('nickname', VALIDATE.JOIN.nickname),
    username: register('username', VALIDATE.JOIN.username),
    password: register('password', VALIDATE.JOIN.password),
    password_check: register('password_check', VALIDATE.JOIN.password_check),
    pw_question_id: register('pw_question_id'),
    pw_answer: register('pw_answer', VALIDATE.JOIN.pw_answer),
    is_agreement: register('is_agreement', VALIDATE.JOIN.is_agreement)
  };

  const watchIsAgreement = watch('is_agreement');
  const watchNickname = watch('nickname');
  const watchUsername = watch('username');

  const handleVerifyNickname = async () => {
    await trigger('nickname');
    if (errors.nickname?.message) return;
    const nickname = getValues('nickname');
    postVerifyNickname(
      { nickname },
      {
        onSuccess: (res) => {
          const { data, error } = res.body;
          if (!data?.is_available || error) {
            const message = translateErrorCode(error?.code);
            return setError('nickname', { message });
          }
          setVerify({ ...verify, nickname: { value: nickname, verified: true, message: '사용 가능한 닉네임입니다.' } });
        }
      }
    );
  };

  const handleVerifyUsername = async () => {
    await trigger('username');
    if (errors.username?.message) return;
    const username = getValues('username');
    postVerifyUsername(
      { username },
      {
        onSuccess: (res) => {
          const { data, error } = res.body;
          if (!data?.is_available || error) {
            const message = translateErrorCode(error?.code);
            return setError('username', { message });
          }
          setVerify({ ...verify, username: { value: username, verified: true, message: '사용 가능한 이메일입니다.' } });
        }
      }
    );
  };

  const handlePostForm = (data: PostJoinPayloadForm) => {
    const { nickname, username, password, pw_question_id, pw_answer, is_agreement } = data;
    const payload: PostJoinPayload = {
      nickname,
      username,
      password,
      pw_question_id,
      pw_answer,
      is_agreement: !!is_agreement
    };
    postJoin(payload, {
      onSuccess: (res) => {
        consoleLogApiResponse(res);
        const { data, error } = res.body;
        if (!data || error) {
          const message = translateErrorCode(error?.code);
          return showToast(message, 'error');
        }
        const nextPath = params.get(APP_QUERIES.NEXT);
        const nextParam = nextPath ? `?${APP_QUERIES.NEXT}=${nextPath}` : '';
        router.push(APP_URLS.LOGIN + nextParam);
      }
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger('password');
    trigger('password_check');
    trigger('pw_answer');
    trigger('is_agreement');
    if (!verify.nickname.verified || !verify.username.verified) {
      if (!verify.nickname.verified && !errors.nickname?.message)
        setError('nickname', { message: '닉네임 중복확인을 수행해주세요.' });
      if (!verify.username.verified && !errors.username?.message)
        setError('username', { message: '이메일 중복확인을 수행해주세요.' });
      return;
    }
    handleSubmit(handlePostForm)(e);
  };

  useEffect(() => {
    if (watchNickname !== verify.nickname?.value) {
      setVerify({ ...verify, nickname: { value: watchNickname, verified: false, message: '' } });
    }
  }, [watchNickname]);

  useEffect(() => {
    if (watchUsername !== verify.username?.value) {
      setVerify({ ...verify, username: { value: watchUsername, verified: false, message: '' } });
    }
  }, [watchUsername]);

  return (
    <form {...restFormProps} onSubmit={handleOnSubmit}>
      <div className="mb-12">
        <p className="font-title-4 mb-6">기본 정보 입력</p>
        <FormInput
          id="nickname"
          containerClassName="mb-6"
          labelClassName="font-subtitle-3 text-gray-01 pb-1"
          register={registerList.nickname}
          message={errors.nickname?.message || verify.nickname.message}
          error={!!errors.nickname?.message}
          success={verify.nickname.verified}
          buttonClassName="btn-ghost btn-sm right-2 rounded-md px-1 py-2 font-semibold"
          buttonChildren="중복확인"
          onButtonClick={handleVerifyNickname}
          placeholder="닉네임을 입력해주세요."
        >
          닉네임
        </FormInput>
        <FormInput
          id="username"
          containerClassName="mb-6"
          labelClassName="font-subtitle-3 text-gray-01 pb-1"
          register={registerList.username}
          message={errors.username?.message || verify.username.message}
          error={!!errors.username?.message}
          success={verify.username.verified}
          buttonClassName="btn-ghost btn-sm right-2 rounded-md px-1 py-2 font-semibold"
          buttonChildren="중복확인"
          onButtonClick={handleVerifyUsername}
          placeholder="이메일을 입력해주세요."
        >
          이메일
        </FormInput>
        <FormInput
          id="password"
          containerClassName="mb-6"
          labelClassName="font-subtitle-3 text-gray-01 pb-1"
          type="password"
          register={registerList.password}
          message={errors.password?.message}
          error={!!errors.password?.message}
          placeholder="비밀번호를 입력해주세요."
        >
          비밀번호
        </FormInput>
        <FormInput
          id="password_check"
          containerClassName="mb-6"
          labelClassName="font-subtitle-3 text-gray-01 pb-1"
          type="password"
          register={registerList.password_check}
          message={errors.password_check?.message}
          error={!!errors.password_check?.message}
          placeholder="비밀번호 확인을 입력해주세요."
        >
          비밀번호 확인
        </FormInput>
      </div>
      <div className="mb-12">
        <p className="font-title-4 mb-6">비밀번호 찾기 정보 입력</p>
        <FormInput
          id="pw_question_id"
          containerClassName="mb-6"
          labelClassName="font-subtitle-3 text-gray-01 pb-1"
          type="dropdown"
          dropdownClassName="h-40"
          dropdownList={PW_QUESTION_DROPDOWN_LIST}
          dropdownDefaultKey={defaultValues.pw_question_id}
          register={registerList.pw_question_id}
          message={errors.pw_question_id?.message}
          error={!!errors.pw_question_id?.message}
        >
          질문
        </FormInput>
        <FormInput
          id="pw_answer"
          containerClassName="mb-6"
          labelClassName="font-subtitle-3 text-gray-01 pb-1"
          register={registerList.pw_answer}
          message={errors.pw_answer?.message}
          error={!!errors.pw_answer?.message}
          placeholder="비밀번호 찾기 답변을 입력해주세요."
        >
          답변
        </FormInput>
      </div>
      <div className="mb-12">
        <p className="font-title-4 mb-6">약관 동의</p>
        <CheckboxInput
          id="is_agreement"
          labelClassName="font-subtitle-3"
          register={registerList.is_agreement}
          message={errors.is_agreement?.message}
          error={!!errors.is_agreement?.message}
          isChecked={watchIsAgreement}
        >
          [필수] 개인정보 수집 및 이용
        </CheckboxInput>
      </div>
      <Button className="btn-solid btn-md w-full" type="submit">
        회원가입
      </Button>
    </form>
  );
}
