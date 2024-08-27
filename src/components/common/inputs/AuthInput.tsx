import { forwardRef, MouseEventHandler, ReactNode, SVGProps, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import Input, { InputProps } from '@/components/common/inputs/Input';
import InputMessage from '@/components/common/inputs/InputMessage';
import EyeOffSvg from '@/icons/eye-off.svg';
import EyeOnSvg from '@/icons/eye-on.svg';
import { COLORS } from '@/libs/constants/colors';

interface AuthInputProps extends Omit<InputProps, 'dropdown'> {
  containerClassName?: string;
  buttonChildren?: ReactNode;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

function EyeToggleButton({ isOn, ...restSvgProps }: { isOn: boolean } & SVGProps<SVGElement>) {
  if (isOn) return <EyeOnSvg {...restSvgProps} />;
  return <EyeOffSvg {...restSvgProps} />;
}

export default forwardRef<HTMLInputElement, AuthInputProps>(function AuthInput(
  {
    containerClassName,
    className,
    children,
    id,
    error,
    success,
    type,
    onButtonClick,
    buttonChildren,
    ...restInputProps
  }: AuthInputProps,
  ref
) {
  const [isPwVisible, setIsPwVisible] = useState(false);

  const errorMessage = typeof error === 'string' ? error : undefined;
  const successMessage = typeof success === 'string' ? success : undefined;

  const handleTogglePwVisible = () => {
    setIsPwVisible(!isPwVisible);
  };

  return (
    <div className={`group ${containerClassName}`}>
      <label
        htmlFor={id}
        className={`font-subtitle-3 leading-loose text-gray-01 ${error ? 'text-red-01' : 'group-focus-within:text-primary-01'}`}
      >
        {children}
      </label>
      <div className="relative">
        <Input
          {...restInputProps}
          id={id}
          className={`border-1 font-body-2 h-12 w-full rounded border-gray-02 px-3 placeholder:text-gray-01 ${className} ${error ? 'border-red-01' : ' focus:border-primary-01'}`}
          type={isPwVisible ? 'string' : type}
          ref={ref}
        />
        <EyeToggleButton
          className={`absolute right-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer ${type !== 'password' && 'hidden'}`}
          color={COLORS.GRAY_01}
          isOn={isPwVisible}
          onClick={handleTogglePwVisible}
        />
        <Button
          className={`btn-ghost btn-sm absolute right-2 top-1/2 h-auto -translate-y-1/2 rounded px-1 py-2 font-semibold ${!buttonChildren && 'hidden'}`}
          onClick={onButtonClick}
        >
          {buttonChildren}
        </Button>
      </div>
      <InputMessage errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
});
