import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import Dropdown from '@/components/common/dropdowns/Dropdown';
import FormInput, { FormInputProps } from '@/components/common/inputs/FormInput';
import DatePicker, { DatePickerProps } from '@/components/features/datePicker/DatePicker';
import CalendarSvg from '@/icons/calendar.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextDropdown from '@/libs/hooks/useContextDropdown';
import { formatDate } from '@/libs/utils/formatDate';

interface PlanOverviewDatePickerInputProps extends FormInputProps, DatePickerProps {
  id: string;
}

function formatDateRangeToString(dateRange: DateRange) {
  const from = dateRange.from
    ? formatDate(dateRange.from, { yearFormat: 'yyyy', monthFormat: 'm', dayFormat: 'd', parser: '.' })
    : '';
  const to = dateRange.to
    ? formatDate(dateRange.to, { yearFormat: 'yyyy', monthFormat: 'm', dayFormat: 'd', parser: '.' })
    : '';
  if (!from) return '';
  if (!to) return from;
  if (from === to) return from;
  return from + ' ~ ' + to;
}

export default function PlanOverviewDatePickerInput({
  id,
  initRange,
  onDateRangeChange,
  disabled = false,
  ...formInputProps
}: PlanOverviewDatePickerInputProps) {
  const [dateRange, setDateRange] = useState<DateRange>(initRange);
  const [formattedValue, setFormattedValue] = useState('');
  const { containerRef, dropdownRef, toggleDropdown, closeDropdown } = useContextDropdown<HTMLDivElement>(id);

  const handleDateRangeChange = (range?: DateRange) => {
    if (!range) return;
    setDateRange(range);
    onDateRangeChange(range);
  };

  useEffect(() => {
    const newFormattedValue = formatDateRangeToString(dateRange);
    setFormattedValue(newFormattedValue);
  }, [dateRange]);

  return (
    <div className="relative" ref={containerRef}>
      <FormInput
        {...formInputProps}
        id={id}
        className="cursor-pointer pr-10"
        labelClassName="font-title-4 pb-2"
        value={formattedValue}
        onClick={() => toggleDropdown(id)}
        onLabelClick={() => closeDropdown()}
        buttonClassName="right-3"
        buttonChildren={<CalendarSvg height={24} color={COLORS.BLACK_01} strokeWidth={1} />}
        onButtonClick={() => toggleDropdown(id)}
        placeholder="여행 날짜를 선택해주세요."
        readOnly={!disabled}
        disabled={disabled}
      >
        여행 날짜
      </FormInput>
      <Dropdown id={id} className="w-full p-3" ref={dropdownRef}>
        <DatePicker initRange={dateRange} onDateRangeChange={handleDateRangeChange} />
      </Dropdown>
    </div>
  );
}
