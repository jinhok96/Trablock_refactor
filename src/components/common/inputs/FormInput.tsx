import { forwardRef, MouseEventHandler, ReactNode, SVGProps, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import ConditionalRender from '@/components/common/ConditionalRender';
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
  buttonType?: 'submit' | 'button';
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onLabelClick?: MouseEventHandler<HTMLLabelElement>;
}

function EyeToggleButton({ isOn, className, ...restSvgProps }: { isOn: boolean } & SVGProps<SVGElement>) {
  if (isOn) return <EyeOnSvg {...restSvgProps} className={`cursor-pointer ${className}`} />;
  return <EyeOffSvg {...restSvgProps} className={`cursor-pointer ${className}`} />;
}

export default forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  {
    id,
    containerClassName,
    labelClassName,
    buttonClassName,
    dropdownClassName,
    dropdownMenuClassName,
    className,
    children,
    message,
    error,
    success,
    type,
    onButtonClick,
    onLabelClick,
    buttonChildren,
    buttonType,
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
      <ConditionalRender condition={!!children}>
        <label
          className={`block text-left ${labelClassName} ${error ? 'text-red-01' : 'group-focus-within:text-primary-01'}`}
          onClick={onLabelClick}
        >
          {children}
        </label>
      </ConditionalRender>
      <div className="relative">
        <Input
          {...restInputProps}
          id={id}
          className={`border-1 font-body-2 w-full rounded-md border-gray-02 p-3 leading-none placeholder:text-gray-01 ${className} ${error ? 'border-red-01' : 'focus:border-primary-01'}`}
          dropdownClassName={`w-full ${dropdownClassName}`}
          dropdownMenuClassName={`!font-normal ${dropdownMenuClassName}`}
          type={isPwVisible ? 'string' : type}
          ref={ref}
        />
        <ConditionalRender condition={type === 'password'}>
          <EyeToggleButton
            className="absolute right-3 top-1/2 size-5 -translate-y-1/2"
            color={COLORS.GRAY_01}
            isOn={isPwVisible}
            onClick={handleTogglePwVisible}
          />
        </ConditionalRender>
        <ConditionalRender condition={!!buttonChildren}>
          <Button
            className={`absolute top-1/2 h-auto -translate-y-1/2 ${buttonClassName}`}
            onClick={onButtonClick}
            disabled={restInputProps.disabled}
            type={buttonType}
          >
            {buttonChildren}
          </Button>
        </ConditionalRender>
      </div>
      <InputMessage message={message} error={error} success={success} />
    </div>
  );
});
