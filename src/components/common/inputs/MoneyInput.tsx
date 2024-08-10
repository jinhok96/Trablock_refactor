import { ChangeEvent, ForwardedRef, forwardRef } from 'react';

import Input, { InputProps } from '@/components/common/inputs/Input';
import { REGEX } from '@/libs/constants/regex';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';

const updateFormattedInputEventCursorPosition = (e: ChangeEvent<HTMLInputElement>, formattedValue: string) => {
  const { value, selectionStart, selectionEnd } = e.target;
  const lengthDiff = formattedValue.length - value.length;

  const newEvent = e;
  newEvent.target.value = formattedValue;
  if (selectionStart) newEvent.target.selectionStart = selectionStart + lengthDiff;
  if (selectionEnd) newEvent.target.selectionEnd = selectionEnd + lengthDiff;

  return newEvent;
};

type MoneyInputProps = Omit<InputProps, 'type' | 'regex'>;

export default forwardRef(function MoneyInput(
  { onChange, ...restInputProps }: MoneyInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberAddCommas(e.target.value);
    const newEvent = updateFormattedInputEventCursorPosition(e, formattedValue);
    onChange(newEvent);
  };

  return <Input {...restInputProps} onChange={handleInputChange} regex={REGEX.MONEY} type="string" ref={ref} />;
});
