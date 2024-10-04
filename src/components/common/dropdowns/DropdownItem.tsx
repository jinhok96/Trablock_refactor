import { HTMLAttributes } from 'react';

import Button, { ButtonProps } from '@/components/common/buttons/Button';

export interface DropdownItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'>,
    Pick<ButtonProps, 'onClick'> {
  selected?: boolean;
}

export default function DropdownItem({ className, selected, onClick, children, ...liProps }: DropdownItemProps) {
  return (
    <li {...liProps} className={`hover:bg-primary-02 ${selected && 'bg-gray-02 hover:bg-gray-02'}`}>
      <Button className={`size-full px-4 py-2 ${className}`} onClick={onClick}>
        {children}
      </Button>
    </li>
  );
}
