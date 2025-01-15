import NextImage from '@/components/common/images/NextImage';
import CheckImg from '@/icons/check.svg?url';

export type InputCheckBoxProps = {
  className?: string;
  error?: boolean;
  success?: boolean;
  checkbox?: boolean;
  isChecked?: boolean;
  indicatorSize?: number;
};

export default function InputCheckBox({
  className,
  error,
  success,
  checkbox,
  isChecked,
  indicatorSize
}: InputCheckBoxProps) {
  if (!checkbox) return;

  return (
    <NextImage
      className={`border-1 size-4 rounded-sm ${error ? 'border-red-01' : success ? 'border-primary-01' : 'border-gray-02'} ${className}`}
      placeholderClassName="bg-white-01"
      src={isChecked && CheckImg}
      alt="check"
      sizes={indicatorSize || 16}
    />
  );
}
