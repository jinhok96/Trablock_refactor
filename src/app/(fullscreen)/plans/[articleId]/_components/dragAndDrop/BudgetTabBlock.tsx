import BudgetBlock from '@/app/(fullscreen)/plans/[articleId]/_components/scheduleBlocks/BudgetBlock';
import { TabBlockProps } from '@/app/(fullscreen)/plans/[articleId]/_types/planDetailDragAndDrop.type';

export default function BudgetTabBlock({ schedule, ...props }: TabBlockProps) {
  const { category, expense } = schedule;

  if (schedule.dtype === 'GENERAL') {
    return (
      <BudgetBlock name={schedule.schedule_general?.place_name || ''} category={category} money={expense} {...props} />
    );
  }

  if (schedule.dtype === 'TRANSPORT') {
    return (
      <BudgetBlock
        name={schedule.schedule_transport?.start_place_name || ''}
        category={category}
        money={expense}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'ETC') {
    return (
      <BudgetBlock name={schedule.schedule_etc?.place_name || ''} category={category} money={expense} {...props} />
    );
  }

  return;
}
