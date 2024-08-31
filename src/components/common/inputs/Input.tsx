import { ChangeEvent, CompositionEvent, FocusEvent, forwardRef, InputHTMLAttributes, useCallback, useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

import InputCheckBox from '@/components/common/inputs/InputCheckBox';
import InputDropdown from '@/components/common/inputs/InputDropdown';
import updateInputEventCursorPosition from '@/libs/utils/updateInputEventCursorPosition';

export type DropdownItem = { inputKey: string | number; displayValue: string };
export type DropdownList = DropdownItem[];

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
  error?: boolean;
  success?: boolean;
  emptyValue?: string;
  isChecked?: string | boolean;
  formatter?: (value: string) => string;
  register?: UseFormRegisterReturn;
  control?: Control<FieldValues>;
  name?: FieldPath<FieldValues>;
  indicatorSize?: number;
  dropdown?: boolean;
  dropdownClassName?: string;
  dropdownMenuClassName?: string;
  dropdownList?: DropdownList;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    error,
    type = 'string',
    emptyValue = '',
    isChecked,
    formatter,
    register,
    control,
    name,
    indicatorSize,
    dropdown = false,
    dropdownClassName,
    dropdownMenuClassName,
    dropdownList,
    ...restInputProps
  }: InputProps,
  ref
) {
  const composingValueRef = useRef('');
  const isComposingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>, onBlur?: (e: FocusEvent<HTMLInputElement>) => void) => {
      onBlur?.(e);
      if (onBlur !== restInputProps?.onBlur) restInputProps?.onBlur?.(e);
    },
    [restInputProps?.onBlur]
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
          className={`read-only:bg-gray-02 focus:outline-0 disabled:bg-gray-02 ${className} ${(type === 'checkbox' || dropdown) && 'hidden'}`}
          type={type === 'dropdown' ? 'string' : type}
          onChange={(e) => handleChange(e, register.onChange)}
          onBlur={(e) => handleBlur(e, register.onBlur)}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={(e) => handleCompositionEnd(e, register.onChange)}
          ref={(e) => {
            register.ref(e);
            inputRef.current = e;
          }}
        />
        <InputCheckBox
          className={className}
          error={error}
          type={type}
          isChecked={isChecked}
          indicatorSize={indicatorSize}
        />
        <InputDropdown
          onChange={register.onChange}
          className={className}
          dropdownClassName={dropdownClassName}
          dropdownMenuClassName={dropdownMenuClassName}
          dropdownList={dropdownList}
          indicatorSize={indicatorSize}
          dropdown={dropdown}
          ref={inputRef}
        />
      </>
    );
  }

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <input
              {...restInputProps}
              {...field}
              className={`focus:outline-0 ${className} ${(type === 'checkbox' || dropdown) && 'hidden'}`}
              type={type === 'dropdown' ? 'string' : type}
              onChange={(e) => handleChange(e, field.onChange)}
              onBlur={(e) => handleBlur(e, field.onBlur)}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={(e) => handleCompositionEnd(e, field.onChange)}
              ref={(e) => {
                field.ref(e);
                inputRef.current = e;
              }}
            />
            <InputCheckBox
              className={className}
              error={error}
              type={type}
              isChecked={isChecked}
              indicatorSize={indicatorSize}
            />
            <InputDropdown
              onChange={field.onChange}
              className={className}
              dropdownClassName={dropdownClassName}
              dropdownMenuClassName={dropdownMenuClassName}
              dropdownList={dropdownList}
              indicatorSize={indicatorSize}
              dropdown={dropdown}
              ref={inputRef}
            />
          </>
        )}
      />
    );
  }

  return (
    <>
      <input
        {...restInputProps}
        className={`focus:outline-0 ${className} ${(type === 'checkbox' || dropdown) && 'hidden'}`}
        type={type === 'dropdown' ? 'string' : type}
        onChange={(e) => handleChange(e, restInputProps.onChange)}
        onBlur={(e) => handleBlur(e, restInputProps.onBlur)}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={(e) => handleCompositionEnd(e, restInputProps.onChange)}
        ref={(e) => {
          if (ref) {
            if (typeof ref === 'function') ref(e);
            else ref.current = e;
          }
          inputRef.current = e;
        }}
      />
      <InputCheckBox
        className={className}
        error={error}
        type={type}
        isChecked={isChecked}
        indicatorSize={indicatorSize}
      />
      <InputDropdown
        onChange={restInputProps.onChange}
        className={className}
        dropdownClassName={dropdownClassName}
        dropdownMenuClassName={dropdownMenuClassName}
        dropdownList={dropdownList}
        indicatorSize={indicatorSize}
        dropdown={dropdown}
        ref={inputRef}
      />
    </>
  );
});
