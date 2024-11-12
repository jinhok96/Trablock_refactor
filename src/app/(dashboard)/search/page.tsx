import articleReaderServices from '@/apis/services/article/reader/fetch';
import { SortParam } from '@/apis/types/common';
import AllResultContent from '@/app/(dashboard)/search/_components/AllResultContent';
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

  const headerClassName = 'font-title-3 md:font-title-2 mb-4 md:mb-5';

  if (!keyword) {
    const getArticleListRes = await articleReaderServices.getArticleList(headers, { sort });
    const { data: getArticleListData } = getArticleListRes.body;

    const sortText: Record<SortParam, string> = {
      'createdAt,desc': '최신',
      popularity: '인기'
    };

    const headerText = `전체 ${sortText[sort]} 여행 계획`;

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
        <p className={headerClassName}>{`'${keyword}' 검색 결과`}</p>
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
