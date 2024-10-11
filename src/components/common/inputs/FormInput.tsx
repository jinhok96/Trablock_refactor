import { forwardRef, MouseEventHandler, ReactNode, SVGProps, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import Input, { InputProps } from '@/components/common/inputs/Input';
import InputMessage from '@/components/common/inputs/InputMessage';
import EyeOffSvg from '@/icons/eye-off.svg';
import EyeOnSvg from '@/icons/eye-on.svg';
import { COLORS } from '@/libs/constants/colors';

export interface FormInputProps extends InputProps {
  containerClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
  buttonChildren?: ReactNode;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onLabelClick?: MouseEventHandler<HTMLLabelElement>;
}

function EyeToggleButton({ isOn, ...restSvgProps }: { isOn: boolean } & SVGProps<SVGElement>) {
  if (isOn) return <EyeOnSvg {...restSvgProps} />;
  return <EyeOffSvg {...restSvgProps} />;
}

export default forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  {
    id,
    containerClassName,
    labelClassName,
    buttonClassName,
    className,
    children,
    message,
    error,
    success,
    type,
    onButtonClick,
    onLabelClick,
    buttonChildren,
    ...restInputProps
  }: FormInputProps,
  ref
) {
  const [isPwVisible, setIsPwVisible] = useState(false);

  const handleTogglePwVisible = () => {
    setIsPwVisible(!isPwVisible);
  };

  return (
    <div className={`group relative ${containerClassName}`}>
      <label
        className={`block text-left ${labelClassName} ${error ? 'text-red-01' : 'group-focus-within:text-primary-01'} ${!children && 'hidden'}`}
        onClick={onLabelClick}
      >
        {children}
      </label>
      <div className="relative">
        <Input
          {...restInputProps}
          id={id}
          className={`border-1 font-body-2 w-full rounded-md border-gray-02 p-3 leading-none placeholder:text-gray-01 ${className} ${error ? 'border-red-01' : 'focus:border-primary-01'}`}
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
          className={`absolute top-1/2 h-auto -translate-y-1/2 ${buttonClassName} ${!buttonChildren && 'hidden'}`}
          onClick={onButtonClick}
          disabled={restInputProps.disabled}
        >
          {buttonChildren}
        </Button>
      </div>
      <InputMessage message={message} error={error} success={success} />
    </div>
  );
});
