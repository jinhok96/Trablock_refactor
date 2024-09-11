import OverviewPlanForm from '@/app/(content)/plans/overview/_components/OverviewPlanForm';

export default function CreatePlanPage() {
  return (
    <div className="px-layout m-auto mt-14 max-w-[32rem]">
      <div className="mb-10 border-b pb-5 text-center">
        <p className="font-subtitle-1 md:font-title-4 mb-2 text-primary-01">여행 계획 생성</p>
        <p className="font-title-2 md:font-title-1">멋진 여행 계획을 세워보세요!</p>
      </div>
      <OverviewPlanForm />
    </div>
  );
}
