import { useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { ResponseGenericBody } from '@/apis/httpClient/httpClient';
import { Article, GetArticleListByUserIdResponse, GetBookmarkListResponse } from '@/apis/services/article/reader/type';
import { useGetArticleListByUserId, useGetBookmarkList } from '@/apis/services/article/reader/useService';
import { ResponseWrapper } from '@/apis/types/common';
import { ProfileTab } from '@/app/(main)/profile/[userId]/_types/type';
import PlanCardList from '@/components/common/cards/PlanCardList';
import PlanCardShapeSelector from '@/components/common/cards/PlanCardShapeSelector';
import TabMenus, { TabList } from '@/components/common/TabMenus/TabMenus';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import useIntersectingState from '@/libs/hooks/useIntersectingState';
import useSearchParams from '@/libs/hooks/useSearchParams';

const TAB_LIST: TabList<ProfileTab> = [
  { tab: 'plans', name: '여행 계획' },
  { tab: 'bookmarks', name: '북마크' }
];

type ProfileContentTabInfoProps = {
  userId: number;
  initPlanListData: GetArticleListByUserIdResponse;
  initBookmarkListData: GetBookmarkListResponse;
  isEditable: boolean;
  initSelectedTab: ProfileTab;
};

const handleFlatMapList = (
  res?: InfiniteData<
    ResponseGenericBody<ResponseWrapper<GetArticleListByUserIdResponse | GetBookmarkListResponse>>,
    unknown
  >
) => {
  if (!res) return null;
  return res.pages.flatMap((item) => {
    if (!item.body.data) return [];
    const { content } = item.body.data;
    if (!content.length) return [];
    return content;
  });
};

export default function ProfileContentTabInfo({
  userId,
  initPlanListData,
  initBookmarkListData,
  isEditable,
  initSelectedTab
}: ProfileContentTabInfoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { ref: plansIntersectRef, isIntersecting: isPlansIntersecting } = useIntersectingState<HTMLDivElement>();
  const { ref: bookmarksIntersectRef, isIntersecting: isBookmarksIntersecting } =
    useIntersectingState<HTMLDivElement>();
  const [selectedTab, setSelectedTab] = useState<ProfileTab>(initSelectedTab);
  const [planList, setPlanList] = useState(initPlanListData.content);
  const [bookmarkList, setBookmarkList] = useState(initBookmarkListData.content);

  // api
  const {
    data: articleListByUserIdData,
    fetchNextPage: fetchNextPlanListPage,
    hasNextPage: hasNextPlanListPage
  } = useGetArticleListByUserId(userId);
  const {
    data: bookmarkListData,
    fetchNextPage: fetchNextBookmarkListPage,
    hasNextPage: hasNextBookmarkListPage
  } = useGetBookmarkList(userId);

  const tabContent: Record<ProfileTab, { initListDataContent: Article[]; list: Article[]; emptyMessage: string }> = {
    plans: {
      initListDataContent: initPlanListData.content,
      list: planList,
      emptyMessage: '여행 계획이 없습니다.'
    },
    bookmarks: {
      initListDataContent: initBookmarkListData.content,
      list: bookmarkList,
      emptyMessage: '북마크가 없습니다.'
    }
  };

  const handleChangeTab = (tab: ProfileTab) => {
    setSelectedTab(tab);
    const newHref = pathname + '?' + params.updateQuery(APP_QUERIES.TAB, tab);
    router.push(newHref, { scroll: false });
  };

  useEffect(() => {
    let newList = null;
    if (selectedTab === 'plans' && hasNextPlanListPage) newList = handleFlatMapList(articleListByUserIdData);
    if (selectedTab === 'bookmarks' && hasNextBookmarkListPage) newList = handleFlatMapList(bookmarkListData);

    if (!newList) return;
    if (selectedTab === 'plans' && hasNextPlanListPage) setPlanList(newList);
    if (selectedTab === 'bookmarks' && hasNextBookmarkListPage) setBookmarkList(newList);
  }, [initPlanListData, initBookmarkListData]);

  // 무한 스크롤
  useEffect(() => {
    if (selectedTab === 'plans' && !isPlansIntersecting) return;
    if (selectedTab === 'bookmarks' && !isBookmarksIntersecting) return;

    const fetchNextPage = async () => {
      let res = null;
      if (selectedTab === 'plans' && hasNextPlanListPage) res = await fetchNextPlanListPage();
      if (selectedTab === 'bookmarks' && hasNextBookmarkListPage) res = await fetchNextBookmarkListPage();

      if (!res?.data) return;

      const newList = handleFlatMapList(res.data);

      if (!newList) return;
      if (selectedTab === 'plans' && hasNextPlanListPage) setPlanList(newList);
      if (selectedTab === 'bookmarks' && hasNextBookmarkListPage) setBookmarkList(newList);
    };

    fetchNextPage();
  }, [isPlansIntersecting, isBookmarksIntersecting, selectedTab, hasNextPlanListPage, hasNextBookmarkListPage]);

  return (
    <div className="w-full">
      <div className="flex-row-center mb-6 w-full justify-between md:mb-7">
        {/* 탭 */}
        <TabMenus className="gap-10" tabList={TAB_LIST} selectedTab={selectedTab} handleChangeTab={handleChangeTab} />
        {/* 카드 레이아웃 */}
        <div className="mb-1.5 md:mb-2">
          <PlanCardShapeSelector />
        </div>
      </div>
      <PlanCardList
        cardList={tabContent[selectedTab].list}
        placeholder={tabContent[selectedTab].emptyMessage}
        isEditable={isEditable}
        priorityNum={tabContent[selectedTab].initListDataContent.length}
        smallGridColsOnDt
      />
      <div className={selectedTab === 'plans' ? 'block' : 'hidden'} ref={plansIntersectRef} />
      <div className={selectedTab === 'bookmarks' ? 'block' : 'hidden'} ref={bookmarksIntersectRef} />
    </div>
  );
}
