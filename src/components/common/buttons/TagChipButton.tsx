import Button, { ButtonProps } from '@/components/common/buttons/Button';

export interface TagChipButtonProps extends ButtonProps {
  selected?: boolean;
}

export default function TagChipButton({
  children,
  className,
  selected = false,
  ...restButtonProps
}: TagChipButtonProps) {
  return (
    <Button
      {...restButtonProps}
      className={`font-btn-chip border-1 h-9 rounded-full bg-white-01 px-5 ${selected ? 'border-secondary-01 text-secondary-01' : ' border-gray-02 text-black-01'} ${className}`}
    >
      {children}
    </Button>
  );
}
