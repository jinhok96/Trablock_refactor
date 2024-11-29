import { useEffect, useState } from 'react';

import { InputProps } from '@/components/common/inputs/Input';

interface InputMessageProps extends Pick<InputProps, 'error' | 'success' | 'message'> {
  className?: string;
}

export default function InputMessage({ className, message, error, success }: InputMessageProps) {
  const [renderMessage, setRenderMessage] = useState(message);
  const [renderError, setRenderError] = useState(error);
  const [renderSuccess, setRenderSuccess] = useState(success);

  useEffect(() => {
    if (!message) {
      const timer = setTimeout(() => {
        setRenderMessage(undefined);
      }, 150);
      return () => clearTimeout(timer);
    }
    setRenderMessage(message);
  }, [message]);

  useEffect(() => {
    if (!error && !success) {
      if (!error) {
        const timer = setTimeout(() => {
          setRenderError(false);
        }, 150);
        return () => clearTimeout(timer);
      } else setRenderError(error);

      if (!success) {
        const timer = setTimeout(() => {
          setRenderSuccess(false);
        }, 150);
        return () => clearTimeout(timer);
      } else setRenderSuccess(success);
    }
    setRenderError(error);
    setRenderSuccess(success);
  }, [error, success]);

  return (
    <p
      className={`font-caption-3 leading-tight transition-[max-height,opacity,margin] ${className} ${message ? 'mt-1.5 max-h-max opacity-100' : 'mt-0 max-h-0 opacity-0'} ${renderError ? 'text-red-01' : renderSuccess && 'text-primary-01'}`}
    >
      {renderMessage}
    </p>
  );
}
