import {
  ChangeEvent,
  CompositionEvent,
  CompositionEventHandler,
  FocusEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useCallback,
  useRef
} from 'react';
import { Control, Controller, FieldPath, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

import InputCheckBox, { InputCheckBoxProps } from '@/components/common/inputs/InputCheckBox';
import InputDropdown, { InputDropdownProps } from '@/components/common/inputs/InputDropdown';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';
import updateInputEventCursorPosition from '@/libs/utils/updateInputEventCursorPosition';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputCheckBoxProps,
    Omit<InputDropdownProps, 'dropdown'> {
  id: string;
  message?: string;
  success?: boolean;
  emptyValue?: string;
  register?: UseFormRegisterReturn;
  control?: Control<FieldValues>;
  name?: FieldPath<FieldValues>;
  type?: HTMLInputTypeAttribute | 'dropdown' | 'money';
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    className,
    error,
    type = 'string',
    emptyValue = '',
    isChecked,
    register,
    control,
    name,
    indicatorSize,
    dropdownClassName,
    dropdownMenuClassName,
    dropdownList,
    dropdownDefaultKey,
    ...restInputProps
  }: InputProps,
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

      if (type === 'money') {
        const formattedValue = formatNumberAddCommas(e.target.value);
        e = updateInputEventCursorPosition(e, formattedValue) as ChangeEvent<HTMLInputElement>;
        e.target.value = formattedValue;
      }

      onChange(e);
    },
    [type, emptyValue]
  );

  const handleBlur = (e: FocusEvent<HTMLInputElement>, onBlur?: (e: FocusEvent<HTMLInputElement>) => void) => {
    onBlur?.(e);
    if (onBlur !== restInputProps?.onBlur) restInputProps?.onBlur?.(e);
  };

  const handleCompositionStart: CompositionEventHandler<HTMLInputElement> = (e) => {
    isComposingRef.current = true;
    restInputProps?.onCompositionStart?.(e);
  };

  const handleCompositionEnd = (
    e: CompositionEvent<HTMLInputElement>,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  ) => {
    isComposingRef.current = false;
    const newEvent = e as unknown as ChangeEvent<HTMLInputElement>;
    newEvent.target.value = composingValueRef.current;
    composingValueRef.current = '';
    handleChange(newEvent, onChange);
    restInputProps?.onCompositionEnd?.(e);
  };

  const inputClassName = `focus:outline-0 disabled:bg-gray-02 disabled:cursor-default ${className} ${(type === 'checkbox' || type === 'dropdown') && 'hidden'}`;

  const inputType = type === 'dropdown' || type === 'money' ? 'string' : type;

  if (register) {
    return (
      <>
        <input
          {...restInputProps}
          {...register}
          id={id}
          className={inputClassName}
          type={inputType}
          onChange={(e) => handleChange(e, register.onChange)}
          onBlur={(e) => handleBlur(e, register.onBlur)}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={(e) => handleCompositionEnd(e, register.onChange)}
          ref={register.ref}
        />
        <InputCheckBox
          className={className}
          error={error}
          checkbox={type === 'checkbox'}
          isChecked={isChecked}
          indicatorSize={indicatorSize}
        />
        <InputDropdown
          onChange={register.onChange}
          className={className}
          id={id}
          dropdownClassName={dropdownClassName}
          dropdownMenuClassName={dropdownMenuClassName}
          dropdownList={dropdownList}
          dropdownDefaultKey={dropdownDefaultKey}
          indicatorSize={indicatorSize}
          dropdown={type === 'dropdown'}
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
              id={id}
              className={inputClassName}
              type={inputType}
              onChange={(e) => handleChange(e, field.onChange)}
              onBlur={(e) => handleBlur(e, field.onBlur)}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={(e) => handleCompositionEnd(e, field.onChange)}
              ref={field.ref}
            />
            <InputCheckBox
              className={className}
              error={error}
              checkbox={type === 'checkbox'}
              isChecked={isChecked}
              indicatorSize={indicatorSize}
            />
            <InputDropdown
              onChange={field.onChange}
              className={className}
              id={id}
              dropdownClassName={dropdownClassName}
              dropdownMenuClassName={dropdownMenuClassName}
              dropdownList={dropdownList}
              dropdownDefaultKey={dropdownDefaultKey}
              indicatorSize={indicatorSize}
              dropdown={type === 'dropdown'}
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
        id={id}
        className={inputClassName}
        type={inputType}
        value={restInputProps.value || ''}
        onChange={(e) => handleChange(e, restInputProps.onChange)}
        onBlur={(e) => handleBlur(e, restInputProps.onBlur)}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={(e) => handleCompositionEnd(e, restInputProps.onChange)}
        ref={ref}
      />
      <InputCheckBox
        className={className}
        error={error}
        checkbox={type === 'checkbox'}
        isChecked={isChecked}
        indicatorSize={indicatorSize}
      />
      <InputDropdown
        onChange={restInputProps.onChange}
        className={className}
        id={id}
        dropdownClassName={dropdownClassName}
        dropdownMenuClassName={dropdownMenuClassName}
        dropdownList={dropdownList}
        dropdownDefaultKey={dropdownDefaultKey}
        indicatorSize={indicatorSize}
        dropdown={type === 'dropdown'}
      />
    </>
  );
});
