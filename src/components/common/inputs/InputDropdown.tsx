import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import { DropdownListItem } from '@/components/common/dropdowns/type';
import ChevronSvg from '@/icons/chevron.svg';
import { CHEVRON_DIRECTION } from '@/libs/constants/chevronDirection';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';

export interface InputDropdownProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  className?: string;
  dropdownClassName?: string;
  dropdownMenuClassName?: string;
  dropdown?: boolean;
  dropdownList?: DropdownListItem[];
  dropdownDefaultKey?: string | number;
  indicatorSize?: number;
}

export default function InputDropdown({
  className,
  dropdownClassName,
  dropdownMenuClassName,
  dropdown,
  id,
  dropdownList,
  dropdownDefaultKey,
  indicatorSize,
  onChange
}: InputDropdownProps) {
  if (!dropdown) return;
  if (!id) throw new Error('dropdownId is required');

  const [selectedItem, setSelectedItem] = useState<DropdownListItem | null | undefined>(
    dropdownList?.find((item) => item.key === dropdownDefaultKey) || dropdownList?.[0]
  );
  const { containerRef, dropdownRef, openedDropdownId, closeDropdown, toggleDropdown } = useContextDropdown(id);

  const handleSelectDropdown = (item: DropdownListItem) => {
    setSelectedItem(item);
    closeDropdown();
    if (!onChange) return;
    const typedEvent = {
      target: {
        value: item.key.toString(),
        name: id
      }
    } as ChangeEvent<HTMLInputElement>;
    onChange(typedEvent);
  };

  return (
    <div className="relative" ref={containerRef}>
      <Button
        className={`border-1 font-body-2 min-h-12 w-full cursor-pointer rounded border-gray-02 p-3 pr-11 leading-snug placeholder:text-gray-01 ${className}`}
        onClick={() => toggleDropdown(id)}
      >
        <span className="w-full">{selectedItem?.value}</span>
      </Button>
      <div className="absolute right-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer">
        <ChevronSvg
          color={COLORS.GRAY_01}
          width={indicatorSize || 20}
          height={indicatorSize || 20}
          transform={openedDropdownId === id ? CHEVRON_DIRECTION.UP : CHEVRON_DIRECTION.DOWN}
          onClick={() => toggleDropdown(id)}
        />
      </div>
      <Dropdown id={id} className={dropdownClassName} ref={dropdownRef}>
        {dropdownList?.map((item) => (
          <DropdownItem
            key={item.key}
            className={dropdownMenuClassName}
            selected={item.key === selectedItem?.key}
            onClick={() => handleSelectDropdown(item)}
          >
            <span className="w-full">{item.value}</span>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}
