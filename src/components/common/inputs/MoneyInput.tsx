import Input, { InputProps } from '@/components/common/inputs/Input';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';

type MoneyInputProps = Omit<InputProps, 'type' | 'formatter'>;

export default function MoneyInput({ ...restInputProps }: MoneyInputProps) {
  return <Input {...restInputProps} type="string" formatter={formatNumberAddCommas} />;
}
