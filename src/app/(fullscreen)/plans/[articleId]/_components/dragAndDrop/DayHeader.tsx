import { getDateFromDayNum } from '@/libs/utils/dateChanger';

// Day N 헤더
export default function DayHeader({
  columnIdx,
  startAt,
  endAt
}: {
  columnIdx: number;
  startAt: string;
  endAt: string;
}) {
  const dayNum = columnIdx + 1;
  const date = getDateFromDayNum(dayNum, startAt, endAt)?.replace(/-/g, '.');

  return (
    <div className="mb-4 w-full border-b border-solid border-gray-02 p-3 text-center md:mb-5">
      <p className="font-title-4 mb-1.5 max-md:text-lg md:mb-2">Day {dayNum}</p>
      <p className="font-caption-2 md:font-caption-1 text-gray-01">{date}</p>
    </div>
  );
}
