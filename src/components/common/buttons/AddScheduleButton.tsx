import Button, { ButtonProps } from '@/components/common/buttons/Button';
import PlusSvg from '@/icons/plus.svg';
import { COLORS } from '@/libs/constants/colors';

export default function AddScheduleButton({ className, ...restButtonProps }: ButtonProps) {
  return (
    <Button {...restButtonProps} className={`btn-md btn-light ${className}`}>
      <PlusSvg fill={COLORS.PRIMARY_01} width="20" height="20" />
    </Button>
  );
}
