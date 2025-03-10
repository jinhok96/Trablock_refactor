'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { GetArticleResponse } from '@/apis/services/article/reader/type';
import { usePutArticleCoverImage } from '@/apis/services/article/writer/useService';
import { usePutScheduleList } from '@/apis/services/articleSchedule/writer/useService';
import { Schedule, ScheduleDetail } from '@/apis/types/common';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import PlanDetailDragAndDrop from '@/app/(fullscreen)/plans/[articleId]/_components/dragAndDrop/PlanDetailDragAndDrop';
import PlanDetailContentHeader from '@/app/(fullscreen)/plans/[articleId]/_components/PlanDetailContentHeader';
import { PlanDetailTab } from '@/app/(fullscreen)/plans/[articleId]/_types/planDetail.type';
import Button from '@/components/common/buttons/Button';
import ButtonWithLoading from '@/components/common/buttons/ButtonWithLoading';
import DayChipButton from '@/components/common/buttons/DayChipButton';
import ConditionalRender from '@/components/common/ConditionalRender';
import TabMenus, { TabList } from '@/components/common/tabMenus/TabMenus';
import { MapMarker, MapMarkerList } from '@/components/features/maps/type';
import ResizableComponent from '@/components/features/resizableComponent/ResizableComponent';
import DefaultCoverImg from '@/images/plan-detail-default-cover-img.png';
import useContextUserData from '@/libs/hooks/useContextUserData';
import useLoadGoogleMapsApi from '@/libs/hooks/useLoadGoogleMapsApi';
import useMediaQuery from '@/libs/hooks/useMediaQuery';
import useToast from '@/libs/hooks/useToast';
import { getDateFromDayNum, getDayNum } from '@/libs/utils/dateChanger';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';

const Map = dynamic(() => import('@/components/features/maps/Map'), { ssr: false });

const TAB_LIST: TabList<PlanDetailTab> = [
  { tab: 'plan', name: '일정' },
  { tab: 'budget', name: '비용' }
];

interface PlanDetailContentProps {
  planDetail: GetArticleResponse;
  initScheduleDetail: ScheduleDetail;
}

// 맵 마커 리스트 생성 함수
function createNewMapMarkerList(scheduleList: Schedule[]) {
  const newMapMarkerList: MapMarkerList = [];

  scheduleList.map((schedule) => {
    const { sort_order, category, schedule_general, schedule_transport } = schedule;

    if (schedule.dtype === 'GENERAL' && schedule_general) {
      const { google_map_latitude, google_map_longitude } = schedule_general;

      const newMapMarker: MapMarker = {
        order: sort_order,
        category,
        coordinate: { lat: google_map_latitude, lng: google_map_longitude }
      };

      return newMapMarkerList.push(newMapMarker);
    }

    if (schedule.dtype === 'TRANSPORT' && schedule_transport) {
      const {
        google_map_start_latitude,
        google_map_start_longitude,
        google_map_end_latitude,
        google_map_end_longitude
      } = schedule_transport;

      const newStartMapMarker: MapMarker = {
        order: sort_order,
        category,
        coordinate: { lat: google_map_start_latitude, lng: google_map_start_longitude },
        transport: 'start'
      };

      const newEndMapMarker: MapMarker = {
        order: sort_order,
        category,
        coordinate: { lat: google_map_end_latitude, lng: google_map_end_longitude },
        transport: 'end'
      };

      return newMapMarkerList.push(newStartMapMarker, newEndMapMarker);
    }
  });

  return newMapMarkerList;
}

export default function PlanDetailContent({ planDetail, initScheduleDetail }: PlanDetailContentProps) {
  const { start_at, end_at, expense, cover_img_url, user_id } = planDetail;

  const { articleId: articleIdParam } = useParams();
  const { userData } = useContextUserData();
  const { isMatch: isDesktop } = useMediaQuery('min', 1280); // 미디어 쿼리; desktop
  const { isMatch: isTablet } = useMediaQuery('min', 768); // 미디어 쿼리; tablet
  const { isLoaded, loadError } = useLoadGoogleMapsApi(); // 구글맵 api
  const { showToast } = useToast();
  const [coverImage, setCoverImage] = useState(cover_img_url || DefaultCoverImg.src);
  const [selectedTab, setSelectedTab] = useState<PlanDetailTab>('plan'); // 탭; 일정/비용
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetail>(initScheduleDetail); // 전체 일정 상세 객체
  const [dayList, setDayList] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [mapMarkerList, setMapMarkerList] = useState<MapMarkerList>();
  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드
  const [expenseSum, setExpenseSum] = useState(0);

  const articleId = Number(articleIdParam);
  const { mutate: putScheduleList, isPending: isPutScheduleListLoading } = usePutScheduleList(articleId);
  const { mutate: putArticleCoverImage, isPending: isPutArticleCoverImageLoading } = usePutArticleCoverImage(articleId);

  const formattedExpense = formatNumberAddCommas(expense);
  const formattedExpenseSum = formatNumberAddCommas(expenseSum);
  const isExpenseSumOver = Number(expense) < expenseSum;

  // 일정 리스트 업데이트
  const handleUpdateScheduleList = (updatedList: Schedule[]) => {
    setScheduleDetail((prev) => ({ ...prev, schedules: updatedList }));
  };

  // 수정한 일정 상세 제출
  const handleEditSubmit = () => {
    putScheduleList(scheduleDetail, {
      onSuccess: (res) => {
        setIsEditMode(false);
        const { data, error } = res.body;
        if (!data || error) return showToast(translateErrorCode(error?.code), 'error');
        showToast('일정 저장 성공!', 'success');
      }
    });
  };

  // 커버 이미지 변경
  const handleChangeCoverImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]; // File
    if (!file) return;

    putArticleCoverImage(
      { file },
      {
        onSuccess: (res) => {
          const { data, error } = res.body;
          if (!data || error) {
            const message = translateErrorCode(error?.code);
            return showToast(message, 'error');
          }
          setCoverImage(data.cover_img_url);
        }
      }
    );
  };

  const handleChangeSelectedDay = (day: number) => {
    setSelectedDay(day);
  };

  const handleSetEditMode = () => {
    setIsEditMode(true);
  };

  // Day N 초기화
  useEffect(() => {
    const lastDayNum = getDayNum(end_at, start_at, end_at);
    if (lastDayNum <= 0) return;
    setDayList(Array.from({ length: lastDayNum }, (_, i) => i + 1));
  }, [planDetail]);

  // 비용 업데이트
  useEffect(() => {
    const handleUpdateExpenseSum = () => {
      const { schedules } = scheduleDetail;
      if (!schedules.length) return;

      let sum = 0;
      schedules.forEach((schedule) => {
        sum += Number(schedule.expense);
      });

      setExpenseSum(sum);
    };

    handleUpdateExpenseSum();
  }, [scheduleDetail]);

  // 구글맵 마커 정보 업데이트
  useEffect(() => {
    const handleUpdateMapMarkerList = () => {
      const { schedules } = scheduleDetail;
      if (!schedules.length) return setMapMarkerList([]);

      const selectedDate = getDateFromDayNum(selectedDay, start_at, end_at);
      if (!selectedDate) return setMapMarkerList([]);

      const selectedDateScheduleList = schedules.filter((schedule) => schedule.visited_date === selectedDate);
      const newMapMarkerList = createNewMapMarkerList(selectedDateScheduleList);
      setMapMarkerList(newMapMarkerList);
    };

    handleUpdateMapMarkerList();
  }, [scheduleDetail, selectedDay]);

  const PlanDetailContentHeaderComponent = (
    <PlanDetailContentHeader
      articleId={articleId}
      planDetail={planDetail}
      scheduleDetail={scheduleDetail}
      isEditMode={isEditMode}
      src={coverImage}
      handleChangeCoverImage={handleChangeCoverImage}
      isLoading={isPutArticleCoverImageLoading}
    />
  );

  // ResizableComponent 외부 콘텐츠
  const outerChildren = (
    <>
      <div className="border-b xl:hidden">{PlanDetailContentHeaderComponent}</div>
      <Map
        className="max-xl:mb-[7.5rem] xl:ml-[27rem]"
        mapMarkerList={mapMarkerList}
        isLoaded={isLoaded}
        loadError={loadError}
      />
    </>
  );

  return (
    <ResizableComponent
      isHorizontal={isDesktop}
      initialSize="50%"
      minSize={isDesktop ? '27rem' : '9rem'}
      maxSize={isTablet ? '100%-4.5rem' : '100%-3.5rem'}
      outerChildren={outerChildren}
    >
      {/* 헤더 */}
      <div className="max-xl:hidden">{PlanDetailContentHeaderComponent}</div>
      <div className="flex grow flex-col">
        <div className="shrink-0">
          <div className="flex-row-center mx-5 mb-5 justify-between md:mx-7 xl:mx-10">
            {/* 탭 */}
            <TabMenus tabList={TAB_LIST} selectedTab={selectedTab} handleChangeTab={(tab) => setSelectedTab(tab)} />
            <div className="flex-row-center gap-3 md:gap-4">
              {/* 비용 */}
              <ConditionalRender condition={selectedTab === 'budget'}>
                <div className="font-caption-2 md:font-caption-1 flex flex-col items-end gap-1 !font-bold leading-none">
                  <p className="text-gray-01">{formattedExpense}원</p>
                  <p className={`${isExpenseSumOver ? 'text-point' : 'text-primary-01'}`}>{formattedExpenseSum}원</p>
                </div>
              </ConditionalRender>
              <ConditionalRender condition={userData?.userId === user_id}>
                {/* 편집 버튼 */}
                <ConditionalRender condition={!isEditMode}>
                  <Button
                    className="btn-ghost btn-sm md:btn-md h-9 w-16 rounded-md md:h-10 md:w-20"
                    onClick={handleSetEditMode}
                  >
                    편집하기
                  </Button>
                </ConditionalRender>
                {/* 편집 완료 버튼 */}
                <ConditionalRender condition={isEditMode}>
                  <ButtonWithLoading
                    className="btn-solid btn-sm md:btn-md h-9 w-16 rounded-md md:h-10 md:w-20"
                    onClick={handleEditSubmit}
                    isLoading={isPutScheduleListLoading}
                  >
                    완료하기
                  </ButtonWithLoading>
                </ConditionalRender>
              </ConditionalRender>
            </div>
          </div>
          {/* Day N 바로가기 버튼 */}
          <div className="shrink-0 overflow-hidden border-b px-5 pb-2 shadow-bottom md:px-7 xl:px-10">
            {dayList.map((day) => (
              <div key={day} className="mb-2 mr-1.5 inline-flex shrink-0 last:mr-0 md:mb-2.5  md:mr-2">
                <DayChipButton selected={day === selectedDay} onClick={() => handleChangeSelectedDay(day)}>
                  Day {day}
                </DayChipButton>
              </div>
            ))}
          </div>
        </div>
        {/* Day 1~N 콘텐츠 */}
        <PlanDetailDragAndDrop
          initList={scheduleDetail.schedules}
          startAt={start_at}
          endAt={end_at}
          selectedTab={selectedTab}
          selectedDay={selectedDay}
          updateList={handleUpdateScheduleList}
          isEditMode={isEditMode}
          handleChangeSelectedDay={handleChangeSelectedDay}
        />
      </div>
    </ResizableComponent>
  );
}
