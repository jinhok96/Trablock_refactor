'use client';

import { HTMLAttributes, SVGProps, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { PostLoginPayload } from '@/apis/services/user/authentication/type';
import { usePostLogin } from '@/apis/services/user/authentication/useService';
import Button from '@/components/common/buttons/Button';
import AuthInput from '@/components/common/inputs/AuthInput';
import Input from '@/components/common/inputs/Input';
import EyeOffSvg from '@/icons/eye-off.svg';
import EyeOnSvg from '@/icons/eye-on.svg';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import { COLORS } from '@/libs/constants/colors';
import { VALIDATE } from '@/libs/constants/validate';
import consoleLogApiResponse from '@/libs/utils/consoleLogApiResponse';
import { setCookieAuthToken } from '@/libs/utils/cookieAuthToken';

type LoginFormProps = HTMLAttributes<HTMLFormElement>;

function EyeToggleButton({ isOn, ...restSvgProps }: { isOn: boolean } & SVGProps<SVGElement>) {
  if (isOn) return <EyeOnSvg {...restSvgProps} />;
  return <EyeOffSvg {...restSvgProps} />;
}

export default function LoginForm({ ...restFormProps }: LoginFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPwVisible, setIsPwVisible] = useState(false);
  const { mutate: postLogin } = usePostLogin();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<PostLoginPayload & { checkAuto: string | boolean }>({
    mode: 'onChange',
    defaultValues: { username: '', password: '' }
  });

  const registerList = {
    username: register('username', VALIDATE.LOGIN.username),
    password: register('password', VALIDATE.LOGIN.password),
    checkAuto: register('checkAuto')
  };

  const handlePostForm = () => {
    const { username, password } = getValues();
    const postLoginPayload: PostLoginPayload = { username, password };
    console.log('postLoginPayload', postLoginPayload);
    postLogin(postLoginPayload, {
      onSuccess: (res) => {
        consoleLogApiResponse(res);
        const data = res.body.data;
        if (!data) return;

        const isAutoLogin = getValues('checkAuto');
        setCookieAuthToken(res, isAutoLogin);

        const nextPath = params.get(APP_QUERIES.NEXT) || '';
        router.push(nextPath);
      }
    });
  };

  const handleTogglePwVisible = () => {
    setIsPwVisible(!isPwVisible);
  };

  return (
    <form {...restFormProps} onSubmit={handleSubmit(handlePostForm)}>
      <label htmlFor="username" className="font-subtitle-3 text-gray-01">
        이메일
      </label>
      <div className="mb-3 mt-1">
        <AuthInput id="username" register={registerList.username} error={!!errors.username} autoFocus />
        <p className="font-caption-3 mt-1 text-red-01">{errors.username?.message}</p>
      </div>
      <label htmlFor="password" className="font-subtitle-3 mb-1 text-gray-01">
        비밀번호
      </label>
      <div className="mb-4 mt-1">
        <div className="relative">
          <AuthInput
            id="password"
            type={isPwVisible ? 'string' : 'password'}
            register={registerList.password}
            error={!!errors.password}
          />
          <EyeToggleButton
            className="absolute right-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer"
            color={COLORS.GRAY_01}
            isOn={isPwVisible}
            onClick={handleTogglePwVisible}
          />
        </div>
        <p className="font-caption-3 mt-1 text-red-01">{errors.password?.message}</p>
      </div>
      <div className="flex-row-center mb-3 gap-1">
        <Input id="checkAuto" className="cursor-pointer" type="checkbox" register={registerList.checkAuto} />
        <label htmlFor="checkAuto" className="font-caption-2 cursor-pointer">
          자동 로그인
        </label>
      </div>
      <Button className="btn-solid btn-md w-full" type="submit">
        로그인
      </Button>
    </form>
  );
}
