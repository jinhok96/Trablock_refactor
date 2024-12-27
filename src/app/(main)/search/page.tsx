import { Metadata } from 'next';

import articleReaderServices from '@/apis/services/article/reader/fetch';
import { SortParam } from '@/apis/types/common';
import AllResultContent from '@/app/(main)/search/_components/AllResultContent';
import SearchResultContent from '@/app/(main)/search/_components/SearchResultContent';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import { METADATA } from '@/libs/constants/metadata';
import { getServerAuthorizationTokenHeader } from '@/libs/utils/cookies/serverCookies';

const SORT_TEXT: Record<SortParam, string> = {
  'createdAt,desc': '최신',
  popularity: '인기'
};

type SearchPageProps = {
  searchParams: Record<string, string>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const keyword = searchParams[APP_QUERIES.KEYWORD];
  const sort: SortParam = (searchParams[APP_QUERIES.SORT] as SortParam) || 'createdAt,desc';

  const headerText = !keyword ? `${SORT_TEXT[sort]} 여행 계획` : `'${keyword}' 검색 결과`;

  return {
    title: METADATA.title + ' | ' + headerText
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams[APP_QUERIES.KEYWORD];
  const sort: SortParam = (searchParams[APP_QUERIES.SORT] as SortParam) || 'createdAt,desc';
  const params = { keyword, sort };

  const headers = await getServerAuthorizationTokenHeader();

  const headerClassName = 'font-title-3 md:font-title-2 mb-4 md:mb-5';
  const headerText = !keyword ? `전체 ${SORT_TEXT[sort]} 여행 계획` : `'${keyword}' 검색 결과`;

  if (!keyword) {
    const getArticleListRes = await articleReaderServices.getArticleList(headers, { sort });
    const { data: getArticleListData } = getArticleListRes.body;

    if (!getArticleListData)
      return (
        <div>
          <p className={headerClassName}>{headerText}</p>
          <p className="font-caption-2 md:font-caption-1 mt-10 text-center text-gray-01">
            네트워크 오류가 발생했습니다.
          </p>
        </div>
      );

    return (
      <div>
        <p className={headerClassName}>{headerText}</p>
        <AllResultContent params={params} data={getArticleListData} />
      </div>
    );
  }

  const getSearchArticleListRes = await articleReaderServices.getSearchArticleList(headers, params);
  const { data: getSearchArticleListData, error: getSearchArticleListDataError } = getSearchArticleListRes.body;

  if (!getSearchArticleListData || getSearchArticleListDataError)
    return (
      <div>
        <p className={headerClassName}>{headerText}</p>
        <p className="font-caption-2 md:font-caption-1 mt-10 text-center text-gray-01">검색 결과가 없습니다.</p>
      </div>
    );

  return (
    <div>
      <p className={headerClassName}>{`'${keyword}' 검색 결과`}</p>
      <SearchResultContent params={params} data={getSearchArticleListData} />
    </div>
  );
}
