import { SortParam } from '@/apis/types/common';
import ArrowButton from '@/components/common/buttons/ArrowButton';
import Button from '@/components/common/buttons/Button';
import Dropdown from '@/components/common/dropdowns/Dropdown';
import DropdownItem from '@/components/common/dropdowns/DropdownItem';
import ClockSvg from '@/icons/clock.svg';
import ThumbsUpSvg from '@/icons/thumbs-up.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';

const SORT_VALUES: Record<SortParam, string> = {
  'createdAt,desc': '최신순',
  popularity: '인기순'
};

const SORT_DROPDOWN_ID = 'sortDropdownId';

type SortDropdownProps = {
  className?: string;
  sort: SortParam;
  onSelect: (sort: SortParam) => void;
};

export default function SortDropdown({ className, sort, onSelect }: SortDropdownProps) {
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown, openedDropdownId } =
    useContextDropdown<HTMLButtonElement>(SORT_DROPDOWN_ID);

  const handleSortChange = (selectedSort: SortParam) => {
    closeDropdown();
    if (selectedSort === sort) return;
    onSelect(selectedSort);
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
        <DropdownItem
          selected={sort === 'createdAt,desc'}
          onClick={() => handleSortChange('createdAt,desc')}
          icon={<ClockSvg color={COLORS.BLACK_01} />}
          text="최신순"
        />
        <DropdownItem
          selected={sort === 'popularity'}
          onClick={() => handleSortChange('popularity')}
          icon={<ThumbsUpSvg color={COLORS.BLACK_01} />}
          text="인기순"
        />
      </Dropdown>
    </div>
  );
}
