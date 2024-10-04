import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, type = 'button', disabled = false, ...restButtonProps }: ButtonProps,
  ref
) {
  return (
    <button
      {...restButtonProps}
      className={`flex-row-center cursor-pointer justify-center ${disabled && 'cursor-disabled'} ${className}`}
      type={type}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  );
});
