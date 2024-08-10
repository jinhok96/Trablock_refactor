import {
  ChangeEvent,
  ChangeEventHandler,
  CompositionEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useRef
} from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  emptyValue?: string | number | readonly string[] | undefined;
  regex?: RegExp;
}

export default forwardRef(function Input(
  { id, className, value, onChange, emptyValue, regex, ...restInputProps }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const isComposingRef = useRef(false);

  const isValidInput = (regex?: RegExp, inputValue?: string) => {
    if (!regex) return true;
    if (!inputValue) return false;
    return regex.test(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isComposingRef.current) return;

    const inputValue = e.target.value;

    if (emptyValue !== undefined && inputValue === '') e.target.value = emptyValue.toString();
    if (typeof inputValue === 'string' && !isValidInput(regex, inputValue) && emptyValue === undefined) return;

    onChange(e);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    handleInputChange(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <input
      {...restInputProps}
      id={id}
      className={`outline-none ${className}`}
      value={value}
      onChange={handleInputChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      ref={ref}
    />
  );
});
