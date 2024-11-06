'use client';

import { FormEvent, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { PostLoginPayload } from '@/apis/services/user/authentication/type';
import { usePostLogin } from '@/apis/services/user/authentication/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import Button from '@/components/common/buttons/Button';
import CheckboxInput from '@/components/common/inputs/CheckboxInput';
import FormInput from '@/components/common/inputs/FormInput';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { PostLoginPayloadForm, VALIDATE } from '@/libs/constants/validate';
import useContextUserData from '@/libs/hooks/useContextUserData';
import consoleLogApiResponse from '@/libs/utils/consoleLogApiResponse';

type LoginFormProps = HTMLAttributes<HTMLFormElement>;

export default function LoginForm({ ...restFormProps }: LoginFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { mutate: postLogin } = usePostLogin();
  const { login } = useContextUserData();

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PostLoginPayloadForm>({
    mode: 'onSubmit',
    defaultValues: { username: '', password: '', auto_login: false }
  });

  const registerList = {
    username: register('username', VALIDATE.LOGIN.username),
    password: register('password', VALIDATE.LOGIN.password),
    check_auto: register('auto_login', VALIDATE.LOGIN.auto_login)
  };

  const watchAutoLogin = watch('auto_login');

  const handlePostForm = (data: PostLoginPayloadForm) => {
    const { username, password, auto_login } = data;
    const payload: PostLoginPayload = { username, password };
    postLogin(payload, {
      onSuccess: async (res) => {
        consoleLogApiResponse(res);
        const { data, error } = res.body;

        if (!data || error) {
          const code = error?.code;
          const message = translateErrorCode(code);
          if (code === 1004) setError('password', { message });
          else setError('username', { message });
          return;
        }

        await login(res, auto_login);

        const nextPath = params.get(APP_QUERIES.NEXT) || APP_URLS.HOME;
        router.push(nextPath);
      }
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(handlePostForm)(e);
  };

  return (
    <form {...restFormProps} onSubmit={handleOnSubmit}>
      <FormInput
        id="username"
        containerClassName="mb-5"
        labelClassName="font-subtitle-3 text-gray-01 pb-1"
        register={registerList.username}
        message={errors.username?.message}
        error={!!errors.username?.message}
        placeholder="이메일을 입력해주세요."
        autoFocus
      >
        이메일
      </FormInput>
      <FormInput
        id="password"
        containerClassName="mb-5"
        labelClassName="font-subtitle-3 text-gray-01 pb-1"
        type="password"
        register={registerList.password}
        message={errors.password?.message}
        error={!!errors.password?.message}
        placeholder="비밀번호를 입력해주세요."
      >
        비밀번호
      </FormInput>
      <div className="md:flex-row-center mb-5 gap-2">
        <CheckboxInput id="auto_login" register={registerList.check_auto} isChecked={watch('auto_login')}>
          <p className="flex-shrink-0">자동 로그인</p>
        </CheckboxInput>
        <p
          className={`font-caption-3 text-gray-01 transition-[height,margin,opacity,visibility] ${watchAutoLogin ? 'opacity-100 max-md:mt-0.5' : 'invisible opacity-0 max-md:h-0'}`}
        >
          * 계정 보안을 위해 개인 기기에서만 사용하세요.
        </p>
      </div>
      <Button className="btn-solid btn-md w-full" type="submit">
        로그인
      </Button>
    </form>
  );
}
