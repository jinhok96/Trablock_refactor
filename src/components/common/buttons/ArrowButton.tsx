import Button, { ButtonProps } from '@/components/common/buttons/Button';
import ChevronSvg from '@/icons/chevron.svg';
import { CHEVRON_DIRECTION, ChevronDirection } from '@/libs/constants/chevronDirection';
import { COLORS } from '@/libs/constants/colors';

interface ArrowButtonProps extends ButtonProps {
  direction: ChevronDirection;
}

export default function ArrowButton({
  className,
  direction = 'UP',
  disabled = false,
  ...restButtonProps
}: ArrowButtonProps) {
  return (
    <Button
      {...restButtonProps}
      className={`size-12 rounded-full bg-white-01 shadow-button ${className}`}
      disabled={disabled}
    >
      <ChevronSvg
        fill={disabled ? COLORS.GRAY_02 : COLORS.BLACK_01}
        width={20}
        height={20}
        transform={CHEVRON_DIRECTION[direction]}
      />
    </Button>
  );
}
