import Input, { InputProps } from '@/components/common/inputs/Input';

type AuthInputProps = InputProps;

export default function AuthInput({ className, error = false, ...restInputProps }: AuthInputProps) {
  return (
    <Input
      {...restInputProps}
      className={`border-1 font-body-2 h-12 w-full rounded  px-3 placeholder:text-gray-01 ${error ? 'border-red-01' : 'border-gray-02'} ${className}`}
    />
  );
}
