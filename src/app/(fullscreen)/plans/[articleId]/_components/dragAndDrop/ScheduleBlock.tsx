import BudgetTabBlock from '@/app/(fullscreen)/plans/[articleId]/_components/dragAndDrop/BudgetTabBlock';
import TravelTabBlock from '@/app/(fullscreen)/plans/[articleId]/_components/dragAndDrop/TravelTabBlock';
import { PlanDetailTab } from '@/app/(fullscreen)/plans/[articleId]/_types/planDetail.type.js';
import { TabBlockProps } from '@/app/(fullscreen)/plans/[articleId]/_types/planDetailDragAndDrop.type';

// 탭 블록 콘텐츠 객체
export default function ScheduleBlock({
  schedule,
  selectedTab,
  ...props
}: TabBlockProps & { selectedTab: PlanDetailTab }) {
  if (selectedTab === 'plan') return <TravelTabBlock schedule={schedule} {...props} />;
  if (selectedTab === 'budget') return <BudgetTabBlock schedule={schedule} {...props} />;
  return null;
}
