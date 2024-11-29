import { ReactNode } from 'react';

type CreatePlanLocationTagProps = {
  className?: string;
  children?: ReactNode;
  text?: string | number;
  type: 'location' | 'other';
};

export default function Tag({ className, children, text = '', type }: CreatePlanLocationTagProps) {
  const hashtag = type === 'other' ? '# ' : '';

  return (
    <div
      className={`font-tag mb-1.5 mr-1.5 inline-flex w-fit shrink-0 whitespace-nowrap rounded-md px-2 py-1.5 ${type === 'location' && 'bg-primary-02 text-primary-01'} ${type === 'other' && 'bg-secondary-02 text-secondary-01'} ${className}`}
    >
      {hashtag + text}
      {children}
    </div>
  );
}
