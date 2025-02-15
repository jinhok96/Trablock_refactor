import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { GetArticleListByUserIdResponse, GetBookmarkListResponse } from '@/apis/services/article/reader/type';
import { useGetArticleListByUserId, useGetBookmarkList } from '@/apis/services/article/reader/useService';
import { ProfileTab } from '@/app/(main)/profile/[userId]/_types/type';
import PlanCardList from '@/components/common/cards/PlanCardList';
import PlanCardShapeSelector from '@/components/common/cards/PlanCardShapeSelector';
import ConditionalRender from '@/components/common/ConditionalRender';
import TabMenus, { TabList } from '@/components/common/tabMenus/TabMenus';
import { APP_QUERIES } from '@/libs/constants/appPaths';
import useInfiniteScrollList from '@/libs/hooks/useInfiniteScrollList';
import useSearchParams from '@/libs/hooks/useSearchParams';

const TAB_LIST: TabList<ProfileTab> = [
  { tab: 'plans', name: '여행 계획' },
  { tab: 'bookmarks', name: '북마크' }
];

type ProfileContentTabInfoProps = {
  userId: number;
  initPlanListData: GetArticleListByUserIdResponse;
  initBookmarkListData: GetBookmarkListResponse;
  initSelectedTab: ProfileTab;
};

export default function ProfileContentTabInfo({
  userId,
  initPlanListData,
  initBookmarkListData,
  initSelectedTab
}: ProfileContentTabInfoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<ProfileTab>(initSelectedTab);
  const useGetArticleListByUserIdRes = useGetArticleListByUserId(userId);
  const useGetBookmarkListRes = useGetBookmarkList(userId);

  const { ref: plansIntersectRef, list: planList } = useInfiniteScrollList<HTMLDivElement>(
    initPlanListData.content,
    useGetArticleListByUserIdRes
  );
  const { ref: bookmarksIntersectRef, list: bookmarkList } = useInfiniteScrollList<HTMLDivElement>(
    initBookmarkListData.content,
    useGetBookmarkListRes
  );

  const handleChangeTab = (tab: ProfileTab) => {
    setSelectedTab(tab);
    const newHref = pathname + '?' + params.updateQuery(APP_QUERIES.TAB, tab);
    router.push(newHref, { scroll: false });
  };

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
      <ConditionalRender condition={selectedTab === 'plans'}>
        <PlanCardList
          cardList={planList}
          placeholder="여행 계획이 없습니다."
          priorityNum={initPlanListData.content.length}
          smallGridColsOnDt
        />
      </ConditionalRender>
      <ConditionalRender condition={selectedTab === 'bookmarks'}>
        <PlanCardList
          cardList={bookmarkList}
          placeholder="북마크가 없습니다."
          priorityNum={initBookmarkListData.content.length}
          smallGridColsOnDt
        />
      </ConditionalRender>
      <ConditionalRender condition={selectedTab === 'plans'}>
        <div ref={plansIntersectRef} />
      </ConditionalRender>
      <ConditionalRender condition={selectedTab === 'bookmarks'}>
        <div ref={bookmarksIntersectRef} />
      </ConditionalRender>
    </div>
  );
}
