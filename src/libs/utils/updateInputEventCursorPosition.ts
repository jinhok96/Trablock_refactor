import { ChangeEvent } from 'react';

export default function updateInputEventCursorPosition(e: ChangeEvent<HTMLInputElement>, formattedValue: string) {
  const { value, selectionStart, selectionEnd } = e.target;
  const lengthDiff = formattedValue.length - value.length;

  const newEvent = e;
  newEvent.target.value = formattedValue;
  if (selectionStart) newEvent.target.selectionStart = selectionStart + lengthDiff;
  if (selectionEnd) newEvent.target.selectionEnd = selectionEnd + lengthDiff;

  return newEvent;
}
