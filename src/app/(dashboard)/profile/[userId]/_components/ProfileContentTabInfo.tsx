import { GetArticleListByUserIdResponse, GetBookmarkListResponse } from '@/apis/services/article/reader/type';

type ProfileContentTabInfoProps = {
  articleListData: GetArticleListByUserIdResponse;
  bookmarkListData: GetBookmarkListResponse;
};

export default function ProfileContentTabInfo({ articleListData, bookmarkListData }: ProfileContentTabInfoProps) {
  console.log('articleListData', articleListData);
  console.log('bookmarkListData', bookmarkListData);
  return <div>ProfileContentTabInfo</div>;
}
