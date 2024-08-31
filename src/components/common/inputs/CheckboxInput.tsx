import { forwardRef } from 'react';

import Input, { InputProps } from '@/components/common/inputs/Input';
import InputMessage from '@/components/common/inputs/InputMessage';

interface CheckboxInputProps extends Omit<InputProps, 'controller' | 'name' | 'type' | 'dropdown'> {
  containerClassName?: string;
  labelClassName?: string;
}

export default forwardRef<HTMLInputElement, CheckboxInputProps>(function CheckboxInput(
  { className, containerClassName, labelClassName, children, id, error, ...restInputProps }: CheckboxInputProps,
  ref
) {
  return (
    <>
      <div className={`leading-none ${containerClassName}`}>
        <label
          htmlFor={id}
          className={`font-body-2 inline-flex cursor-pointer items-center gap-1.5 leading-snug ${labelClassName} ${error && 'text-red-01'}`}
        >
          <Input
            {...restInputProps}
            id={id}
            className={`flex-shrink-0 ${className}`}
            error={error}
            type="checkbox"
            ref={ref}
          />
          {children}
        </label>
        <InputMessage className="relative -top-0.5" message={typeof error === 'string' ? error : undefined} />
      </div>
    </>
  );
});
