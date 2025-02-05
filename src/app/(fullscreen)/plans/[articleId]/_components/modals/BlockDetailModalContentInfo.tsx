import { ReactNode } from 'react';

type BlockDetailModalContentInfoProps = {
  className?: string;
  label: string;
  children: ReactNode;
};

export default function BlockDetailModalContentInfo({ className, label, children }: BlockDetailModalContentInfoProps) {
  if (!children) return null;

  return (
    <div className={`flex gap-2.5 ${className}`}>
      <p className="font-subtitle-2 shrink-0 leading-snug">{label}</p>
      <p className="font-caption-1 break-words leading-snug text-black-03">{children}</p>
    </div>
  );
}
