import { MouseEvent, ReactNode } from 'react';
import { ButtonProps } from 'react-day-picker';

import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import KebabSvg from '@/icons/kebab.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';

interface KebabDropdownButtonProps extends ButtonProps {
  dropdownId: string;
  color?: string;
  children: ReactNode;
  dropdownClassName?: string;
}

export default function KebabDropdownButton({
  dropdownId,
  color = COLORS.GRAY_01,
  children,
  className,
  dropdownClassName
}: KebabDropdownButtonProps) {
  const { containerRef, dropdownRef, toggleDropdown } = useContextDropdown<HTMLButtonElement>(dropdownId);

  const handleToggleDropdown = (e: MouseEvent, dropdownId: string) => {
    e.preventDefault();
    toggleDropdown(dropdownId);
  };

  return (
    <div>
      <Button className={className} onClick={(e) => handleToggleDropdown(e, dropdownId)} ref={containerRef}>
        <KebabSvg color={color} />
      </Button>
      <Dropdown id={dropdownId} className={dropdownClassName} ref={dropdownRef}>
        {children}
      </Dropdown>
    </div>
  );
}
