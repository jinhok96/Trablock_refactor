import { FieldValues } from 'react-hook-form';

import Input, { InputProps } from '@/components/common/inputs/Input';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';

type MoneyInputProps<T extends FieldValues> = Omit<InputProps<T>, 'type' | 'formatter'>;

export default function MoneyInput<T extends FieldValues>({ ...restInputProps }: MoneyInputProps<T>) {
  return <Input {...restInputProps} type="string" formatter={formatNumberAddCommas} />;
}
