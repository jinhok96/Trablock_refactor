import PlanOverviewForm from '@/app/(content)/plans/overview/_components/PlanOverviewForm';

export default function CreatePlanOverviewPage() {
  return (
    <div className="px-layout m-auto mt-14 max-w-[32rem]">
      <div className="mb-10 border-b pb-5 text-center">
        <p className="font-subtitle-1 md:font-title-4 mb-2 text-primary-01">여행 계획 작성</p>
        <p className="font-title-2 md:font-title-1">멋진 여행 계획을 세워보세요!</p>
      </div>
      <PlanOverviewForm />
    </div>
  );
}
