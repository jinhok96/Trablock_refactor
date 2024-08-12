import { ChangeEvent, CompositionEvent, InputHTMLAttributes, useCallback, useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

import updateInputEventCursorPosition from '@/libs/utils/updateInputEventCursorPosition';

export interface InputProps<T extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  emptyValue?: string;
  formatter?: (value: string) => string;
  register?: UseFormRegisterReturn;
  controller?: Control<T>;
  name?: FieldPath<T>;
}

export default function Input<T extends FieldValues>({
  emptyValue = '',
  formatter,
  register,
  controller,
  name,
  ...restInputProps
}: InputProps<T>) {
  const composingValueRef = useRef('');
  const isComposingRef = useRef(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, onChange?: (e: ChangeEvent<HTMLInputElement>) => void) => {
      if (!onChange) return;
      if (!e.target.value) e.target.value = emptyValue;

      if (isComposingRef.current) {
        composingValueRef.current = e.target.value;
        return onChange(e);
      }

      let formattedValue = e.target.value;
      if (formatter) {
        formattedValue = formatter(e.target.value);
        e = updateInputEventCursorPosition(e, formattedValue);
      }

      e.target.value = formattedValue;
      onChange(e);
    },
    [formatter, isComposingRef]
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
      onChange={(e) => handleChange(e, restInputProps.onChange)}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={(e) => handleCompositionEnd(e, restInputProps.onChange)}
    />
  );
}
