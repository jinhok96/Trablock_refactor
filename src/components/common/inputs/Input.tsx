import { ChangeEvent, CompositionEvent, forwardRef, InputHTMLAttributes, useCallback, useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

import updateInputEventCursorPosition from '@/libs/utils/updateInputEventCursorPosition';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  emptyValue?: string;
  formatter?: (value: string) => string;
  register?: UseFormRegisterReturn;
  controller?: Control<FieldValues>;
  name?: FieldPath<FieldValues>;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = 'string', emptyValue = '', formatter, register, controller, name, ...restInputProps }: InputProps,
  ref
) {
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
      <>
        <input
          {...restInputProps}
          {...register}
          className={`focus:outline-0 ${className}`}
          type={type}
          onChange={(e) => handleChange(e, register.onChange)}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={(e) => handleCompositionEnd(e, register.onChange)}
          ref={register.ref}
        />
      </>
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
            className={`focus:outline-0 ${className}`}
            type={type}
            onChange={(e) => handleChange(e, field.onChange)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={(e) => handleCompositionEnd(e, field.onChange)}
            ref={field.ref}
          />
        )}
      />
    );
  }

  return (
    <input
      {...restInputProps}
      className={`focus:outline-0 ${className}`}
      type={type}
      onChange={(e) => handleChange(e, restInputProps.onChange)}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={(e) => handleCompositionEnd(e, restInputProps.onChange)}
      ref={ref}
    />
  );
});
