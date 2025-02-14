import KebabDropdownButton, { KebabDropdownButtonProps } from '@/components/common/buttons/KebabDropdownButton';
import DropdownItem, { DropdownItemProps } from '@/components/common/dropdowns/DropdownItem';
import CalendarSvg from '@/icons/calendar.svg';
import DeleteSvg from '@/icons/trash.svg';
import { COLORS } from '@/libs/constants/colors';

export interface PlanCardDropdownProps extends Pick<KebabDropdownButtonProps, 'dropdownId'> {
  onEditPlanClick: DropdownItemProps['onClick'];
  onDeletePlanClick: DropdownItemProps['onClick'];
}

export default function PlanCardDropdown({ dropdownId, onEditPlanClick, onDeletePlanClick }: PlanCardDropdownProps) {
  return (
    <KebabDropdownButton
      dropdownId={dropdownId}
      className="absolute right-3 top-3 size-6 md:right-4 md:top-4"
      dropdownClassName="right-3 top-9 md:right-4 md:top-10"
    >
      <DropdownItem onClick={onEditPlanClick} icon={<CalendarSvg color={COLORS.BLACK_01} />} text="여행 계획 수정" />
      <DropdownItem
        className="text-red-01"
        onClick={onDeletePlanClick}
        icon={<DeleteSvg color={COLORS.RED_01} />}
        text="여행 계획 삭제"
      />
    </KebabDropdownButton>
  );
}
