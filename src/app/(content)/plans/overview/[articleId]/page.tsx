import { notFound } from 'next/navigation';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import OverviewPlanForm from '@/app/(content)/plans/overview/_components/OverviewPlanForm';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

type CreatePlanPageProps = {
  params: { articleId: number };
};

export default async function CreatePlanPage({ params }: CreatePlanPageProps) {
  const { articleId } = params;

  const headers = await getAuthorizationTokenHeader();
  const res = await articleReaderServices.getArticle(articleId, headers);
  const { data, error } = res.body;

  if (!data || error) notFound();

  return (
    <div className="px-layout m-auto mt-14 max-w-[32rem]">
      <div className="mb-10 border-b pb-5 text-center">
        <p className="font-subtitle-1 md:font-title-4 mb-2 text-primary-01">여행 계획 편집</p>
        <p className="font-title-2 md:font-title-1">멋진 여행 계획을 세워보세요!</p>
      </div>
      <OverviewPlanForm initialValues={data} />
    </div>
  );
}
