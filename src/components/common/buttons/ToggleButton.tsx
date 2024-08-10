import Button, { ButtonProps } from '@/components/common/buttons/Button';

interface ToggleButtonProps extends ButtonProps {
  on?: boolean;
}

export default function ToggleButton({ className, on = false, ...restButtonProps }: ToggleButtonProps) {
  return (
    <Button {...restButtonProps} className={`flex-row-center ${className}`}>
      <div
        className={`flex h-5 w-8 items-center rounded-full p-1 transition-colors duration-300 ${on ? 'bg-primary-01' : 'bg-gray-02'}`}
      >
        <div
          className={`size-4 transform rounded-full bg-white-01 transition-transform duration-300 ${on ? 'translate-x-[0.625rem]' : 'translate-x-[-0.125rem]'}`}
        />
      </div>
    </Button>
  );
}
