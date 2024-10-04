import AddScheduleButton from '@/components/common/buttons/AddScheduleButton';
import ArrowButton from '@/components/common/buttons/ArrowButton';
import DayChipButton from '@/components/common/buttons/DayChipButton';
import TagChipButton from '@/components/common/buttons/TagChipButton';

export default function HomePage() {
  return (
    <div className="w-full">
      <AddScheduleButton className="w-40" />
      <ArrowButton direction="RIGHT" />
      <DayChipButton selected>Day 1</DayChipButton>
      <DayChipButton>Day 1</DayChipButton>
      <TagChipButton selected>혼자서</TagChipButton>
      <TagChipButton>혼자서</TagChipButton>
      <AddScheduleButton className="w-40" />
      <ArrowButton direction="DOWN" />
      <DayChipButton selected>Day 1</DayChipButton>
      <DayChipButton>Day 1</DayChipButton>
      <TagChipButton selected>혼자서</TagChipButton>
      <TagChipButton>혼자서</TagChipButton>
      <AddScheduleButton className="w-40" />
      <ArrowButton direction="UP" />
      <DayChipButton selected>Day 1</DayChipButton>
      <DayChipButton>Day 1</DayChipButton>
      <TagChipButton selected>혼자서</TagChipButton>
      <TagChipButton>혼자서</TagChipButton>
      <AddScheduleButton className="w-40" />
      <ArrowButton direction="RIGHT" />
      <DayChipButton selected>Day 1</DayChipButton>
      <DayChipButton>Day 1</DayChipButton>
      <TagChipButton selected>혼자서</TagChipButton>
      <TagChipButton>혼자서</TagChipButton>
      <AddScheduleButton className="w-40" />
      <ArrowButton direction="LEFT" />
      <DayChipButton selected>Day 1</DayChipButton>
      <DayChipButton>Day 1</DayChipButton>
      <TagChipButton selected>혼자서</TagChipButton>
      <TagChipButton>혼자서</TagChipButton>
    </div>
  );
}
