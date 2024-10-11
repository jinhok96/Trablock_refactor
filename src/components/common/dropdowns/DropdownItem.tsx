import { HTMLAttributes } from 'react';

import Button, { ButtonProps } from '@/components/common/buttons/Button';
import { DropdownListMenu } from '@/components/common/dropdowns/type';

export interface DropdownItemProps<T>
  extends DropdownListMenu<T>,
    Omit<HTMLAttributes<HTMLLIElement>, 'onClick'>,
    Pick<ButtonProps, 'onClick'> {
  selected?: boolean;
  align?: 'left' | 'center' | 'right';
}

export default function DropdownItem<T extends string>({
  className,
  icon,
  text,
  selected,
  onClick,
  children,
  align = 'left',
  ...liProps
}: DropdownItemProps<T>) {
  return (
    <li {...liProps} className={`hover:bg-primary-02 ${selected && 'bg-gray-02 hover:bg-gray-02'}`}>
      <Button
        className={`font-btn-text size-full gap-1.5 py-2 pl-4 pr-6 ${align === 'left' && '!justify-start'} ${align === 'right' && '!justify-end'} ${className}`}
        onClick={onClick}
      >
        <div className={`size-4 ${!icon && 'hidden'}`}>{icon}</div>
        <span>{text}</span>
        {children}
      </Button>
    </li>
  );
}
