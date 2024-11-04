import { SortParam } from '@/apis/types/common';
import ArrowButton from '@/components/common/buttons/ArrowButton';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import { DropdownListMenu } from '@/components/common/dropdowns/type';
import ClockSvg from '@/icons/clock.svg';
import ThumbsUpSvg from '@/icons/thumbs-up.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';

const SORT: Record<DropdownList, SortParam> = {
  최신순: 'createdAt,desc',
  인기순: 'popularity'
};

const SORT_VALUES: Record<SortParam, DropdownList> = {
  'createdAt,desc': '최신순',
  popularity: '인기순'
};

const SORT_DROPDOWN_ID = 'sortDropdownId';

type DropdownList = '최신순' | '인기순';
const SORT_DROPDOWN_LIST: Array<DropdownListMenu<DropdownList>> = [
  { icon: <ClockSvg color={COLORS.BLACK_01} />, text: '최신순' },
  { icon: <ThumbsUpSvg color={COLORS.BLACK_01} />, text: '인기순' }
];

type SortDropdownProps = {
  className?: string;
  sort: SortParam;
  onSelect: (sort: SortParam) => void;
};

export default function SortDropdown({ className, sort, onSelect }: SortDropdownProps) {
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown, openedDropdownId } =
    useContextDropdown<HTMLButtonElement>(SORT_DROPDOWN_ID);

  const handleDropdownSelect = (text?: DropdownList) => {
    closeDropdown();
    if (!text) return;

    const sort = SORT[text];
    onSelect(sort);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        className="gap-2 rounded-md border border-solid px-4 py-2"
        onClick={() => toggleDropdown(SORT_DROPDOWN_ID)}
        ref={containerRef}
      >
        <span>{SORT_VALUES[sort]}</span>
        <ArrowButton direction={`${openedDropdownId === SORT_DROPDOWN_ID ? 'UP' : 'DOWN'}`} div />
      </Button>
      <Dropdown id={SORT_DROPDOWN_ID} className="top-[2.625rem] w-full" ref={dropdownRef}>
        {SORT_DROPDOWN_LIST.map((item) => {
          const { text } = item;
          return (
            <DropdownItem
              key={text}
              selected={text === SORT_VALUES[sort]}
              onClick={() => handleDropdownSelect(text)}
              {...item}
            />
          );
        })}
      </Dropdown>
    </div>
  );
}
