import { FieldValues } from 'react-hook-form';

import Input, { InputProps } from '@/components/common/inputs/Input';
import { REGEX } from '@/libs/constants/regex';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';

type MoneyInputProps<T extends FieldValues> = Omit<InputProps<T>, 'type' | 'regex' | 'formatter'>;

export default function MoneyInput<T extends FieldValues>({ ...restInputProps }: MoneyInputProps<T>) {
  return <Input {...restInputProps} regex={REGEX.MONEY} type="string" formatter={formatNumberAddCommas} />;
}
