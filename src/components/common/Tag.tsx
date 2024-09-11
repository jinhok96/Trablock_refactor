import { ReactNode } from 'react';

type CreatePlanLocationTagProps = {
  className?: string;
  children?: ReactNode;
};

export default function Tag({ className, children }: CreatePlanLocationTagProps) {
  return (
    <div
      className={`flex-row-center font-tag mb-1.5 mr-1.5 inline-flex rounded bg-primary-02 px-2 py-1.5 text-primary-01 ${className}`}
    >
      {children}
    </div>
  );
}
