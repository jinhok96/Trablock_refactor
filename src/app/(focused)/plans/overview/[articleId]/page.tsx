import { Metadata } from 'next';

import { notFound } from 'next/navigation';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import PlanOverviewForm from '@/app/(focused)/plans/overview/_components/PlanOverviewForm';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';
import { METADATA } from '@/libs/constants/metadata';

type EditPlanOverviewPageProps = {
  params: { articleId: string };
};

export async function generateMetadata({ params }: EditPlanOverviewPageProps): Promise<Metadata> {
  const articleId = Number(params.articleId);

  const headers = await getAuthorizationTokenHeader();
  const res = await articleReaderServices.getArticle(articleId, headers);

  return {
    title: METADATA.title + ' | ' + res.body.data?.title
  };
}

export default async function EditPlanOverviewPage({ params }: EditPlanOverviewPageProps) {
  const articleId = Number(params.articleId);

  const headers = await getAuthorizationTokenHeader();
  const res = await articleReaderServices.getArticle(articleId, headers);
  const { data, error } = res.body;

  if (!data || error) notFound();

  return (
    <div className="px-layout m-auto mt-14 max-w-[32rem]">
      <div className="mb-10 border-b pb-5 text-center">
        <p className="font-subtitle-1 md:font-title-4 mb-2 text-primary-01">여행 계획 수정</p>
        <p className="font-title-2 md:font-title-1">멋진 여행 계획을 세워보세요!</p>
      </div>
      <PlanOverviewForm articleId={articleId} initialValues={data} />
    </div>
  );
}
