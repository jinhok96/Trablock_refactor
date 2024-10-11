import { forwardRef } from 'react';

import Button, { ButtonProps } from '@/components/common/buttons/Button';
import Loading from '@/components/common/Loading';
import { COLORS } from '@/libs/constants/colors';

interface ButtonWithLoadingProps extends ButtonProps {
  isLoading: boolean;
  loadingIndicatorSize?: string | number;
  loadingIndicatorColor?: string;
  loadingIndicatorStrokeWidth?: string | number;
}

export default forwardRef<HTMLButtonElement, ButtonWithLoadingProps>(function ButtonWithLoading(
  {
    children,
    className,
    isLoading,
    loadingIndicatorSize = 18,
    loadingIndicatorColor = COLORS.WHITE_01,
    loadingIndicatorStrokeWidth = 4,
    disabled,
    ...restButtonProps
  }: ButtonWithLoadingProps,
  ref
) {
  return (
    <Button
      {...restButtonProps}
      className={className}
      disabledClassName="btn-disabled"
      disabled={disabled || isLoading}
      ref={ref}
    >
      <Loading
        width={loadingIndicatorSize}
        height={loadingIndicatorSize}
        color={loadingIndicatorColor}
        strokeWidth={loadingIndicatorStrokeWidth}
        visible={isLoading}
      />
      {!isLoading && children}
    </Button>
  );
});
