import { Metadata } from 'next';

import { notFound } from 'next/navigation';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import articleScheduleReaderServices from '@/apis/services/articleSchedule/reader/fetch';
import PlanDetailContent from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/PlanDetailContent';
import { METADATA } from '@/libs/constants/metadata';
import { getServerAuthorizationTokenHeader } from '@/libs/utils/serverCookies';

type PlanDetailPageProps = {
  params: { articleId: string };
};

export async function generateMetadata({ params }: PlanDetailPageProps): Promise<Metadata> {
  const articleId = Number(params.articleId);

  const headers = await getServerAuthorizationTokenHeader();
  const articleRes = await articleReaderServices.getArticle(articleId, headers);

  return {
    title: METADATA.title + ' | ' + articleRes.body.data?.title
  };
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const articleId = Number(params.articleId);

  const headers = await getServerAuthorizationTokenHeader();
  const articleRes = await articleReaderServices.getArticle(articleId, headers);
  const scheduleListRes = await articleScheduleReaderServices.getScheduleList(articleId, headers);
  const { data: articleData, error: articleError } = articleRes.body;
  const { data: scheduleListData, error: scheduleListError } = scheduleListRes.body;

  if (!articleData || articleError || !scheduleListData || scheduleListError) notFound();

  return <PlanDetailContent planDetail={articleData} initScheduleDetail={scheduleListData} />;
}
