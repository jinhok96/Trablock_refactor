import { useEffect, useState } from 'react';

type InputMessageProps = {
  className?: string;
  errorMessage?: string;
  successMessage?: string;
};

export default function InputMessage({ className, errorMessage, successMessage }: InputMessageProps) {
  const [error, setError] = useState(errorMessage);
  const [success, setSuccess] = useState(successMessage);
  const [message, setMessage] = useState(errorMessage || successMessage);

  const newMessage = errorMessage || successMessage;

  useEffect(() => {
    if (!newMessage) {
      const timer = setTimeout(() => {
        setMessage(undefined);
        setError(undefined);
        setSuccess(undefined);
      }, 150);
      return () => clearTimeout(timer);
    }
    setMessage(newMessage);
    if (error !== errorMessage) setError(errorMessage);
    if (success !== successMessage) setSuccess(successMessage);
  }, [errorMessage, successMessage, newMessage]);

  return (
    <p
      className={`font-caption-3 leading-tight transition-[max-height,opacity,margin] ${className} ${newMessage ? 'mt-1.5 max-h-max opacity-100' : 'mt-0 max-h-0 opacity-0'} ${success ? 'text-primary-01' : 'text-red-01'}`}
    >
      {message}
    </p>
  );
}
