import { useEffect, useState } from 'react';

import { InputProps } from '@/components/common/inputs/Input';

interface InputMessageProps extends Pick<InputProps, 'error' | 'success' | 'message'> {
  className?: string;
}

export default function InputMessage({ className, message, success, error }: InputMessageProps) {
  const [renderMessage, setRenderMessage] = useState(message);

  useEffect(() => {
    if (!message) {
      const timer = setTimeout(() => {
        setRenderMessage(undefined);
      }, 150);
      return () => clearTimeout(timer);
    }
    setRenderMessage(message);
  }, [message]);

  return (
    <p
      className={`font-caption-3 leading-tight transition-[max-height,opacity,margin] ${className} ${message ? 'mt-1.5 max-h-max opacity-100' : 'mt-0 max-h-0 opacity-0'} ${error ? 'text-red-01' : success && 'text-primary-01'}`}
    >
      {renderMessage}
    </p>
  );
}
