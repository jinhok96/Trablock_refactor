import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id' | 'type' | 'accept'> {
  children: ReactNode;
  className?: string;
  id: string;
}

export default forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { children, className, id, ...restInputProps }: FileInputProps,
  ref
) {
  return (
    <>
      <input
        {...restInputProps}
        id={id}
        className="hidden"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
        ref={ref}
      />
      <label htmlFor={id} className={`cursor-pointer ${className}`}>
        {children}
      </label>
    </>
  );
});
