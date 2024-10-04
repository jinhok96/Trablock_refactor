import { notFound } from 'next/navigation';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import articleScheduleReaderServices from '@/apis/services/articleSchedule/reader/fetch';
import PlanDetailContent from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/PlanDetailContent';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

type PlanDetailPageProps = {
  params: { articleId: number };
};

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { articleId } = params;

  const headers = await getAuthorizationTokenHeader();
  const articleRes = await articleReaderServices.getArticle(articleId, headers);
  const scheduleListRes = await articleScheduleReaderServices.getScheduleList(articleId, headers);
  const { data: articleData, error: articleError } = articleRes.body;
  const { data: scheduleListData, error: scheduleListError } = scheduleListRes.body;

  if (!articleData || articleError || !scheduleListData || scheduleListError) notFound();

  return <PlanDetailContent planDetail={articleData} initScheduleDetail={scheduleListData} />;
}