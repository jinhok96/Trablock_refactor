import { HTMLAttributes } from 'react';

import Button, { ButtonProps } from '@/components/common/buttons/Button';

interface DropdownItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'>, Pick<ButtonProps, 'onClick'> {
  selected?: boolean;
}

export default function DropdownItem({ className, selected, onClick, children, ...liProps }: DropdownItemProps) {
  return (
    <li {...liProps} className={`w-full hover:bg-primary-02 ${selected && 'bg-gray-02 hover:bg-gray-02'}`}>
      <Button className={`size-full px-3 py-2 ${className}`} onClick={onClick}>
        {children}
      </Button>
    </li>
  );
}
