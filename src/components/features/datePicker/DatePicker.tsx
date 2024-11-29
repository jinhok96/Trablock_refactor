import { useState } from 'react';
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';

import { ko } from 'date-fns/locale';

import ArrowButton from '@/components/common/buttons/ArrowButton';

export type DatePickerProps = {
  initRange: DateRange;
  onDateRangeChange: (range?: DateRange) => void;
};

export default function DatePicker({ initRange, onDateRangeChange }: DatePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>(initRange);
  const currentMonth = initRange.from ? initRange.from : new Date();
  const [month, setMonth] = useState(currentMonth);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') return setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
  };

  const handleSelectRange: SelectRangeEventHandler = (selectedRange) => {
    const newSelectedRange: DateRange = {
      from: selectedRange?.from,
      to: selectedRange?.to || selectedRange?.from
    };
    setRange(newSelectedRange);
    onDateRangeChange(newSelectedRange);
  };

  return (
    <div className="flex-col-center w-full">
      <div className="absolute flex w-56 justify-between py-4">
        <ArrowButton className="w-6" direction="LEFT" onClick={() => handleMonthChange('prev')} />
        <ArrowButton className="w-6" direction="RIGHT" onClick={() => handleMonthChange('next')} />
      </div>
      <DayPicker
        mode="range"
        month={month}
        selected={range}
        onSelect={handleSelectRange}
        numberOfMonths={1}
        locale={ko}
        disableNavigation
        formatters={{
          formatWeekdayName: (weekday) => ['일', '월', '화', '수', '목', '금', '토'][weekday.getDay()],
          formatCaption: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        }}
        className="mb-0 block w-full"
        classNames={{
          months: 'w-full',
          month: 'flex-col-center',
          caption_label: 'text-center w-full mb-5 font-subtitle-1 leading-none',
          table: 'w-full',
          head_cell: 'text-center font-body-2 !font-semibold text-gray-01 first:text-red-01',
          row: 'border-y-[0.375rem] border-white-01',
          cell: 'font-body-2 leading-none text-center',
          day: 'size-10 text-center hover:rounded-full border-none w-full',
          day_today: 'text-primary-01 font-bold',
          day_selected: 'bg-gray-02 hover:rounded-none',
          day_range_start: 'rounded-l-full hover:rounded-l-full',
          day_range_end: 'rounded-r-full hover:rounded-r-full'
        }}
      />
    </div>
  );
}
