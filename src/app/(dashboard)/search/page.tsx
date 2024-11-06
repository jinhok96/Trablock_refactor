import articleReaderServices from '@/apis/services/article/reader/fetch';
import { SortParam } from '@/apis/types/common';
import SearchResultContent from '@/app/(dashboard)/search/_components/SearchResultContent';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import { getServerAuthorizationTokenHeader } from '@/libs/utils/serverCookies';

type SearchPageProps = {
  searchParams: Record<string, string>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams[APP_QUERIES.KEYWORD];
  const sort: SortParam = (searchParams[APP_QUERIES.SORT] as SortParam) || 'createdAt,desc';
  const params = { keyword, sort };

  const headers = await getServerAuthorizationTokenHeader();

  const getSearchArticleListRes = await articleReaderServices.getSearchArticleList(headers, params);
  const { data: getSearchArticleListData, error: getSearchArticleListDataError } = getSearchArticleListRes.body;

  if (!getSearchArticleListData || getSearchArticleListDataError)
    return (
      <div>
        <p className="font-title-3 md:font-title-2 mb-3 md:mb-4">{`'${keyword}' 검색 결과`}</p>
        <p className="font-caption-2 md:font-caption-1 mt-10 text-center text-gray-01">검색 결과가 없습니다.</p>
      </div>
    );

  return (
    <div>
      <p className="font-title-3 md:font-title-2 mb-3 md:mb-4">{`'${keyword}' 검색 결과`}</p>
      <SearchResultContent params={params} data={getSearchArticleListData} />
    </div>
  );
}
