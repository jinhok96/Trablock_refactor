import { forwardRef } from 'react';

import Input, { InputProps } from '@/components/common/inputs/Input';

interface DropdownInputProps extends Omit<InputProps, 'controller' | 'name'> {
  containerClassName?: string;
}

export default forwardRef<HTMLInputElement, DropdownInputProps>(function DropdownInput(
  { className, containerClassName, children, id, ...restInputProps }: DropdownInputProps,
  ref
) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="font-subtitle-3 leading-loose text-gray-01">
        {children}
      </label>
      <Input {...restInputProps} id={id} className={className} dropdown ref={ref} />
    </div>
  );
});
