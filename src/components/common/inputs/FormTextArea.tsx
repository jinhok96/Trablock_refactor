import { forwardRef, MouseEventHandler, ReactNode, TextareaHTMLAttributes } from 'react';

import Button from '@/components/common/buttons/Button';
import { InputProps } from '@/components/common/inputs/Input';
import InputMessage from '@/components/common/inputs/InputMessage';

export interface FormTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Pick<InputProps, 'error' | 'success' | 'message'> {
  containerClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
  buttonChildren?: ReactNode;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onLabelClick?: MouseEventHandler<HTMLLabelElement>;
  disabled?: boolean;
}

export default forwardRef<HTMLTextAreaElement, FormTextAreaProps>(function FormTextArea(
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
    onButtonClick,
    onLabelClick,
    buttonChildren,
    disabled,
    ...restTextAreaProps
  }: FormTextAreaProps,
  ref
) {
  return (
    <div className={`group relative ${containerClassName}`}>
      <label
        className={`block text-left ${labelClassName} ${error ? 'text-red-01' : 'group-focus-within:text-primary-01'} ${!children && 'hidden'}`}
        onClick={onLabelClick}
      >
        {children}
      </label>
      <div className="relative">
        <textarea
          {...restTextAreaProps}
          id={id}
          className={`border-1 font-body-2 scrollbar h-12 w-full rounded-md border-gray-02 px-3 py-2 outline-none placeholder:text-gray-01 ${className} ${error ? 'border-red-01' : 'focus:border-primary-01'}`}
          ref={ref}
        />
        <Button
          className={`absolute top-1/2 h-auto -translate-y-1/2 ${buttonClassName} ${!buttonChildren && 'hidden'}`}
          onClick={onButtonClick}
          disabled={disabled}
        >
          {buttonChildren}
        </Button>
      </div>
      <InputMessage message={message} error={error} success={success} />
    </div>
  );
});
