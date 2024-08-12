import { ChangeEvent, CompositionEvent, InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

import updateInputEventCursorPosition from '@/libs/utils/updateInputEventCursorPosition';

export interface InputProps<T extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  emptyValue?: string;
  regex?: RegExp;
  formatter?: (value: string) => string;
  register?: UseFormRegisterReturn;
  controller?: Control<T>;
  name?: FieldPath<T>;
}

export default function Input<T extends FieldValues>({
  emptyValue = '',
  regex,
  formatter,
  register,
  controller,
  name,
  ...restInputProps
}: InputProps<T>) {
  const [value, setValue] = useState(restInputProps.value || restInputProps.defaultValue || '');
  const composingValueRef = useRef('');
  const isComposingRef = useRef(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, onChange?: (e: ChangeEvent<HTMLInputElement>) => void) => {
      const newValue = e.target.value;

      if (isComposingRef.current) {
        composingValueRef.current = newValue;
        setValue(newValue);
        return;
      }

      let formattedValue = newValue;
      if (formatter) {
        formattedValue = formatter(newValue);
        e = updateInputEventCursorPosition(e, formattedValue);
      }

      if (!regex?.test(formattedValue)) {
        e.preventDefault();
        return;
      }

      setValue(formattedValue);

      if (onChange) {
        onChange(e);
      }
    },
    [regex, formatter, isComposingRef]
  );

  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true;
  }, []);

  const handleCompositionEnd = useCallback(
    (e: CompositionEvent<HTMLInputElement>, onChange?: (e: ChangeEvent<HTMLInputElement>) => void) => {
      isComposingRef.current = false;
      const newEvent = e as unknown as ChangeEvent<HTMLInputElement>;
      newEvent.target.value = composingValueRef.current;
      composingValueRef.current = '';
      handleChange(newEvent, onChange);
    },
    [handleChange]
  );

  if (register) {
    return (
      <input
        {...restInputProps}
        {...register}
        value={value || emptyValue}
        onChange={(e) => handleChange(e, register.onChange)}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={(e) => handleCompositionEnd(e, register.onChange)}
      />
    );
  }

  if (controller && name) {
    return (
      <Controller
        control={controller}
        name={name}
        render={({ field }) => (
          <input
            {...restInputProps}
            {...field}
            value={value || emptyValue}
            onChange={(e) => handleChange(e, field.onChange)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={(e) => handleCompositionEnd(e, field.onChange)}
          />
        )}
      />
    );
  }

  return (
    <input
      {...restInputProps}
      value={value || emptyValue}
      onChange={(e) => handleChange(e, restInputProps.onChange)}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={(e) => handleCompositionEnd(e, restInputProps.onChange)}
    />
  );
}
