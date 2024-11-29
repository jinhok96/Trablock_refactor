import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabledClassName?: string;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, disabledClassName, type = 'button', disabled = false, ...restButtonProps }: ButtonProps,
  ref
) {
  return (
    <button
      {...restButtonProps}
      className={`flex-row-center cursor-pointer justify-center ${disabled && (disabledClassName || 'cursor-disabled')} ${className}`}
      type={type}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  );
});
