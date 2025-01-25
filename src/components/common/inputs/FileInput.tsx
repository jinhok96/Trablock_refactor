import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id' | 'type'> {
  children: ReactNode;
  className?: string;
  id: string;
  acceptImage?: boolean;
}

export default forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { children, className, id, acceptImage, accept, ...restInputProps }: FileInputProps,
  ref
) {
  return (
    <>
      <input
        {...restInputProps}
        id={id}
        className="hidden"
        type="file"
        accept={acceptImage ? 'image/png, image/jpeg, image/jpg, image/webp, image/avif' : accept}
        ref={ref}
      />
      <label htmlFor={id} className={`cursor-pointer ${className}`}>
        {children}
      </label>
    </>
  );
});
