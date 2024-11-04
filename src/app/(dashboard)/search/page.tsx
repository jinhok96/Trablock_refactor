import articleReaderServices from '@/apis/services/article/reader/fetch';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import { SortParam } from '@/apis/types/common';
import SearchResultContent from '@/app/(dashboard)/search/_components/SearchResultContent';
import { getAuthorizationTokenHeader, getUserId } from '@/app/actions/cookieActions';
import { APP_QUERIES } from '@/libs/constants/appPaths';

type SearchPageProps = {
  searchParams: Record<string, string>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams[APP_QUERIES.KEYWORD];
  const sort: SortParam = (searchParams[APP_QUERIES.SORT] as SortParam) || 'createdAt,desc';
  const params = { keyword, sort };

  const headers = await getAuthorizationTokenHeader();
  const userId = (await getUserId()) || 0;

  const getSearchArticleListRes = await articleReaderServices.getSearchArticleList(headers, params);
  const { data: getSearchArticleListData, error: getSearchArticleListDataError } = getSearchArticleListRes.body;

  const getUserProfileRes = await userProfileReaderServices.getUserProfile(userId, headers, true);
  const { data: getUserProfileData, error: getUserProfileDataError } = getUserProfileRes.body;

  if (!getSearchArticleListData || getSearchArticleListDataError || !getUserProfileData || getUserProfileDataError)
    return (
      <div>
        <p className="font-title-3 md:font-title-2 mb-3 md:mb-4">{`'${keyword}' 검색 결과`}</p>
        <p className="font-caption-2 md:font-caption-1 mt-10 text-center text-gray-01">검색 결과가 없습니다.</p>
      </div>
    );

  return (
    <div>
      <p className="font-title-3 md:font-title-2 mb-3 md:mb-4">{`'${keyword}' 검색 결과`}</p>
      <SearchResultContent params={params} data={getSearchArticleListData} myProfile={getUserProfileData} />
    </div>
  );
}
