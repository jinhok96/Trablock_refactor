type YearFormat = 'yy' | 'yyyy';
type MonthFormat = 'm' | 'mm';
type DayFormat = 'd' | 'dd';

type FormatOptions = {
  yearFormat: YearFormat;
  monthFormat: MonthFormat;
  dayFormat: DayFormat;
  parser?: string;
};

export function formatDate(date: Date, options: FormatOptions) {
  const { yearFormat, monthFormat, dayFormat, parser } = options;
  const formattedDate = {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    day: date.getDate().toString()
  };
  if (yearFormat === 'yy') formattedDate.year = formattedDate.year.slice(-2);
  if (monthFormat === 'm') formattedDate.month = formattedDate.month.padStart(2, '0');
  if (dayFormat === 'd') formattedDate.day = formattedDate.day.padStart(2, '0');
  return `${formattedDate.year}${parser}${formattedDate.month}${parser}${formattedDate.day}`;
}
