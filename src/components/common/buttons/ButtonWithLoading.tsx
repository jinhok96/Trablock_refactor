import { forwardRef } from 'react';

import Button, { ButtonProps } from '@/components/common/buttons/Button';
import ConditionalRender from '@/components/common/ConditionalRender';
import Loading from '@/components/common/Loading';
import { COLORS } from '@/libs/constants/colors';

export interface ButtonWithLoadingProps extends ButtonProps {
  isLoading: boolean;
  loadingIndicatorSize?: string | number;
  loadingIndicatorColor?: string;
  loadingIndicatorStrokeWidth?: string | number;
}

export default forwardRef<HTMLButtonElement, ButtonWithLoadingProps>(function ButtonWithLoading(
  {
    children,
    className,
    disabledClassName,
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
      disabledClassName={`btn-disabled ${disabledClassName}`}
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
      <ConditionalRender condition={!isLoading}>{children}</ConditionalRender>
    </Button>
  );
});
