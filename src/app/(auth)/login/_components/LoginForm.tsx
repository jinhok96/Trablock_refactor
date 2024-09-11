'use client';

import { FormEvent, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { PostLoginPayload } from '@/apis/services/user/authentication/type';
import { usePostLogin } from '@/apis/services/user/authentication/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import Button from '@/components/common/buttons/Button';
import AuthInput from '@/components/common/inputs/AuthInput';
import CheckboxInput from '@/components/common/inputs/CheckboxInput';
import { APP_QUERIES, APP_URLS } from '@/libs/constants/appPaths';
import { PostLoginPayloadForm, VALIDATE } from '@/libs/constants/validate';
import consoleLogApiResponse from '@/libs/utils/consoleLogApiResponse';
import { setCookieAuthToken } from '@/libs/utils/cookieAuthToken';

type LoginFormProps = HTMLAttributes<HTMLFormElement>;

export default function LoginForm({ ...restFormProps }: LoginFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { mutate: postLogin } = usePostLogin();

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PostLoginPayloadForm>({
    mode: 'onSubmit',
    defaultValues: { username: '', password: '' }
  });

  const registerList = {
    username: register('username', VALIDATE.LOGIN.username),
    password: register('password', VALIDATE.LOGIN.password),
    check_auto: register('auto_login', VALIDATE.LOGIN.auto_login)
  };

  const watchAutoLogin = watch('auto_login');

  const handlePostForm = () => {
    const { username, password } = getValues();
    const postLoginPayload: PostLoginPayload = { username, password };
    postLogin(postLoginPayload, {
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
        const isAutoLogin = getValues('auto_login');
        await setCookieAuthToken(res, isAutoLogin);
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
      <AuthInput
        id="username"
        containerClassName="mb-4"
        register={registerList.username}
        message={errors.username?.message}
        error={!!errors.username?.message}
        placeholder="이메일을 입력해주세요."
        autoFocus
      >
        이메일
      </AuthInput>
      <AuthInput
        id="password"
        containerClassName="mb-5"
        type="password"
        register={registerList.password}
        message={errors.password?.message}
        error={!!errors.password?.message}
        placeholder="비밀번호를 입력해주세요."
      >
        비밀번호
      </AuthInput>
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