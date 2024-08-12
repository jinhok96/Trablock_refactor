import { ChangeEvent, ForwardedRef, forwardRef } from 'react';

import Input, { InputProps } from '@/components/common/inputs/Input';
import { REGEX } from '@/libs/constants/regex';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';
import updateInputEventCursorPosition from '@/libs/utils/updateInputEventCursorPosition';

type MoneyInputProps = Omit<InputProps, 'type' | 'regex'>;

export default forwardRef(function MoneyInput(
  { onChange, ...restInputProps }: MoneyInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberAddCommas(e.target.value);
    const newEvent = updateInputEventCursorPosition(e, formattedValue);
    onChange(newEvent);
  };

  return <Input {...restInputProps} onChange={handleInputChange} regex={REGEX.MONEY} type="string" ref={ref} />;
});
