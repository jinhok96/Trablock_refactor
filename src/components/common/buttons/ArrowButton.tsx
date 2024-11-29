import { forwardRef } from 'react';

import Button, { ButtonProps } from '@/components/common/buttons/Button';
import ChevronSvg from '@/icons/chevron.svg';
import { CHEVRON_DIRECTION, ChevronDirection } from '@/libs/constants/chevronDirection';
import { COLORS } from '@/libs/constants/colors';

export interface ArrowButtonProps extends ButtonProps {
  direction: ChevronDirection;
  width?: number | string;
  height?: number | string;
  div?: boolean;
}

export default forwardRef<HTMLButtonElement, ArrowButtonProps>(function ArrowButton(
  {
    className,
    direction = 'UP',
    disabled = false,
    width = 20,
    height = 20,
    color = COLORS.BLACK_01,
    div,
    ...restButtonProps
  }: ArrowButtonProps,
  ref
) {
  if (div)
    return (
      <div className={className}>
        <ChevronSvg
          color={disabled ? COLORS.GRAY_02 : color}
          width={width}
          height={height}
          transform={CHEVRON_DIRECTION[direction]}
        />
      </div>
    );

  return (
    <Button {...restButtonProps} className={className} disabled={disabled} ref={ref}>
      <ChevronSvg
        color={disabled ? COLORS.GRAY_02 : color}
        width={width}
        height={height}
        transform={CHEVRON_DIRECTION[direction]}
      />
    </Button>
  );
});
