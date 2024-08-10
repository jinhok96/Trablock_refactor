import Button, { ButtonProps } from '@/components/common/buttons/Button';

interface DayChipButtonProps extends ButtonProps {
  selected?: boolean;
}

export default function DayChipButton({
  children,
  className,
  selected = false,
  ...restButtonProps
}: DayChipButtonProps) {
  return (
    <Button
      {...restButtonProps}
      className={`font-btn-chip border-1 h-10 min-w-20 rounded-full ${selected ? 'border-black-01 bg-black-01 text-white-01' : ' border-gray-02 bg-white-01 text-black-01'} ${className}`}
    >
      {children}
    </Button>
  );
}
