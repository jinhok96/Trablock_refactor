import TagChipButton, { TagChipButtonProps } from '@/components/common/buttons/TagChipButton';

interface OverviewPlanTagInputProps<T> extends Omit<TagChipButtonProps, 'selected' | 'onClick'> {
  list: T[];
  selectedList: T[] | [];
  onClick: (tag: T) => void;
}

export default function OverviewPlanTagInput<T>({
  className,
  children,
  list,
  onClick,
  selectedList
}: OverviewPlanTagInputProps<T extends string ? T : string>) {
  return (
    <div className={className}>
      <p className="font-subtitle-2 mb-3">{children}</p>
      {list.map((tag) => (
        <TagChipButton
          key={tag}
          className="mb-2 mr-2 inline-block text-center"
          selected={selectedList.some((selected) => selected === tag)}
          onClick={() => onClick(tag)}
        >
          {tag}
        </TagChipButton>
      ))}
    </div>
  );
}
