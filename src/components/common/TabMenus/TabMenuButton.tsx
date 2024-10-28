import { useRef } from 'react';

import Button, { ButtonProps } from '@/components/common/buttons/Button';

export interface TabMenuButtonProps extends ButtonProps {
  tabName: string;
  isSelected: boolean;
}

export default function TabMenuButton({ tabName, isSelected, onClick, ...restButtonProps }: TabMenuButtonProps) {
  const buttonRef = useRef(null);

  return (
    <Button
      {...restButtonProps}
      className={`flex-col-center gap-1.5 pb-1.5 ${isSelected && 'border-b-2 border-solid border-black-01 text-black-01 '}`}
      onClick={onClick}
      ref={buttonRef}
    >
      {tabName}
    </Button>
  );
}
