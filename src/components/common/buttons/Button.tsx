import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  type = 'button',
  disabled = false,
  ...restButtonProps
}: ButtonProps) {
  return (
    <button
      {...restButtonProps}
      className={`flex-row-center justify-center ${disabled && 'cursor-disabled'} ${className}`}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
