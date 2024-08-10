import Button, { ButtonProps } from '@/components/common/buttons/Button';
import ChevronSvg from '@/icons/chevron.svg';
import { COLORS } from '@/libs/constants/colors';

type Direction = 'left' | 'right' | 'up' | 'down';

interface ArrowButtonProps extends ButtonProps {
  direction: Direction;
}

export default function ArrowButton({
  className,
  direction = 'up',
  disabled = false,
  ...restButtonProps
}: ArrowButtonProps) {
  const transform: { [key in Direction]: string } = {
    up: 'rotate(0)',
    right: 'rotate(90)',
    down: 'rotate(180)',
    left: 'rotate(-90)'
  };

  return (
    <Button
      {...restButtonProps}
      className={`size-12 rounded-full bg-white-01 shadow-button ${className}`}
      disabled={disabled}
    >
      <ChevronSvg
        fill={disabled ? COLORS.GRAY_02 : COLORS.BLACK_01}
        width="20"
        height="20"
        transform={transform[direction]}
      />
    </Button>
  );
}
