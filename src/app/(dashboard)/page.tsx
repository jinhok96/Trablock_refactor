import AsyncBoundary from '@/components/common/AsyncBoundary';
import AddScheduleButton from '@/components/common/buttons/AddScheduleButton';
import ArrowButton from '@/components/common/buttons/ArrowButton';
import DayChipButton from '@/components/common/buttons/DayChipButton';
import TagChipButton from '@/components/common/buttons/TagChipButton';

export default function HomePage() {
  return (
    <div className="w-full">
      <AsyncBoundary errorFallback={<div>error</div>} loadingFallback={<div>loading</div>}>
        <AddScheduleButton className="w-40" />
        <ArrowButton direction="right" />
        <DayChipButton selected>Day 1</DayChipButton>
        <DayChipButton>Day 1</DayChipButton>
        <TagChipButton selected>혼자서</TagChipButton>
        <TagChipButton>혼자서</TagChipButton>
        <AddScheduleButton className="w-40" />
        <ArrowButton direction="right" />
        <DayChipButton selected>Day 1</DayChipButton>
        <DayChipButton>Day 1</DayChipButton>
        <TagChipButton selected>혼자서</TagChipButton>
        <TagChipButton>혼자서</TagChipButton>
        <AddScheduleButton className="w-40" />
        <ArrowButton direction="right" />
        <DayChipButton selected>Day 1</DayChipButton>
        <DayChipButton>Day 1</DayChipButton>
        <TagChipButton selected>혼자서</TagChipButton>
        <TagChipButton>혼자서</TagChipButton>
        <AddScheduleButton className="w-40" />
        <ArrowButton direction="right" />
        <DayChipButton selected>Day 1</DayChipButton>
        <DayChipButton>Day 1</DayChipButton>
        <TagChipButton selected>혼자서</TagChipButton>
        <TagChipButton>혼자서</TagChipButton>
        <AddScheduleButton className="w-40" />
        <ArrowButton direction="right" />
        <DayChipButton selected>Day 1</DayChipButton>
        <DayChipButton>Day 1</DayChipButton>
        <TagChipButton selected>혼자서</TagChipButton>
        <TagChipButton>혼자서</TagChipButton>
      </AsyncBoundary>
    </div>
  );
}
