import { ChangeEvent, forwardRef, useEffect, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import { DropdownItem, InputProps } from '@/components/common/inputs/Input';
import ChevronSvg from '@/icons/chevron.svg';
import { CHEVRON_DIRECTION } from '@/libs/constants/chevronDirection';
import { COLORS } from '@/libs/constants/colors';

type InputDropdownProps = Pick<
  InputProps,
  | 'className'
  | 'dropdownClassName'
  | 'dropdownMenuClassName'
  | 'dropdown'
  | 'dropdownList'
  | 'indicatorSize'
  | 'onChange'
>;

export default forwardRef<HTMLInputElement, InputDropdownProps>(function InputDropdown(
  {
    className,
    dropdownClassName,
    dropdownMenuClassName,
    dropdownList,
    indicatorSize,
    dropdown,
    onChange
  }: InputDropdownProps,
  ref
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<DropdownItem | undefined>(dropdownList?.[0]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleDropdownSelect = (item: DropdownItem, onChange?: (e: ChangeEvent<HTMLInputElement>) => void) => {
    setSelectedDropdownItem(item);
    handleDropdownClose();

    if (onChange && typeof ref !== 'function' && ref?.current) {
      ref.current.focus();
      ref.current.value = item.inputKey.toString();
      const event = new Event('input', { bubbles: true });
      ref.current.dispatchEvent(event);
      const typedEvent = {
        ...event,
        target: {
          ...event.target,
          value: item.inputKey
        }
      };
      onChange(typedEvent as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  useEffect(() => {
    if (typeof ref !== 'function' && ref?.current) {
      const defaultKey = ref.current.value;
      setSelectedDropdownItem(
        dropdownList?.find((item) => {
          if (typeof item.inputKey === 'number') return item.inputKey === Number(defaultKey);
          return item.inputKey === defaultKey;
        })
      );
    }
  }, []);

  return (
    <div className={`relative ${!dropdown && 'hidden'}`} onBlur={handleDropdownClose}>
      <Button
        className={`border-1 font-body-2 min-h-12 w-full cursor-pointer rounded border-gray-02 p-3 pr-11 leading-snug placeholder:text-gray-01 ${className}`}
        onClick={handleDropdownToggle}
      >
        <span className="w-full">{selectedDropdownItem?.displayValue}</span>
      </Button>
      <div className="absolute right-3 top-1/2 size-5 -translate-y-1/2 cursor-pointer">
        <ChevronSvg
          fill={COLORS.GRAY_01}
          width={indicatorSize || 20}
          height={indicatorSize || 20}
          transform={isDropdownOpen ? CHEVRON_DIRECTION.UP : CHEVRON_DIRECTION.DOWN}
          onClick={handleDropdownToggle}
        />
      </div>
      <div
        className={`border-1 font-body-2 scrollbar absolute top-14 z-10 w-full overflow-auto rounded border-gray-02 bg-white-01 py-1.5 leading-snug transition-[opacity,visibility] ${dropdownClassName} ${isDropdownOpen ? 'opacity-100' : 'invisible opacity-0'}`}
      >
        {dropdownList?.map((item) => (
          <Button
            key={item.inputKey}
            className={`w-full cursor-pointer px-3 py-2 hover:bg-primary-02 ${item.inputKey === selectedDropdownItem?.inputKey && 'bg-primary-02'} ${dropdownMenuClassName}`}
            onMouseDown={() => handleDropdownSelect(item, onChange)}
          >
            <span className="w-full">{item.displayValue}</span>
          </Button>
        ))}
      </div>
    </div>
  );
});
