import { InputProps } from '@/components/common/inputs/Input';
import NextImage from '@/components/common/NextImage';
import CheckImg from '@/icons/check.svg?url';

type InputCheckBox = Pick<InputProps, 'className' | 'error' | 'type' | 'isChecked' | 'indicatorSize'>;

export default function InputCheckBox({ className, error, type, isChecked, indicatorSize }: InputCheckBox) {
  return (
    <NextImage
      className={`border-1 size-4 rounded-sm ${error ? 'border-red-01' : 'border-gray-02'} ${className} ${type !== 'checkbox' && 'hidden'}`}
      src={isChecked && CheckImg}
      alt="check"
      width={indicatorSize || 16}
      height={indicatorSize || 16}
    />
  );
}
