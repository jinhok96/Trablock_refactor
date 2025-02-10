import { useEffect, useRef, useState } from 'react';

import { DraggableLocation, OnDragEndResponder } from '@hello-pangea/dnd';
import dynamic from 'next/dynamic';

import { Schedule } from '@/apis/types/common';
import INIT_SCHEDULE_DATA from '@/app/(fullscreen)/plans/[articleId]/_components/dragAndDrop/constant';
import DayHeader from '@/app/(fullscreen)/plans/[articleId]/_components/dragAndDrop/DayHeader';
import ScheduleBlock from '@/app/(fullscreen)/plans/[articleId]/_components/dragAndDrop/ScheduleBlock';
import BlockDetailBudgetModal from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailBudgetModal';
import BlockDetailModal from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModal';
import CreateBlockModal from '@/app/(fullscreen)/plans/[articleId]/_components/modals/CreateBlockModal';
import {
  CommonBlockDetailData,
  EtcBlockDetailData,
  OnBlockDetailEdit,
  OnBudgetDetailEdit,
  OnEtcSelect,
  OnPlaceSelect,
  OnTransportSelect,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';
import { PlanDetailTab } from '@/app/(fullscreen)/plans/[articleId]/_types/planDetail.type.js';
import { ScheduleWithKey } from '@/app/(fullscreen)/plans/[articleId]/_types/planDetailDragAndDrop.type';
import Button from '@/components/common/buttons/Button';
import ConditionalRender from '@/components/common/ConditionalRender';
import PlusSvg from '@/icons/plus.svg';
import TrashSvg from '@/icons/trash.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextModal from '@/libs/hooks/useContextModal';
import { LoadGoogleMapsApiReturn } from '@/libs/hooks/useLoadGoogleMapsApi';
import useMediaQuery from '@/libs/hooks/useMediaQuery';
import { getDateFromDayNum, getDayNum } from '@/libs/utils/dateChanger';

const Droppable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Draggable), { ssr: false });
const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.DragDropContext), { ssr: false });

type BaseData = Omit<CommonBlockDetailData, 'name'>;
type BlockData = PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData | undefined;

interface PlanDetailDragAndDropProps extends LoadGoogleMapsApiReturn {
  initList: Schedule[];
  startAt: string;
  endAt: string;
  selectedTab: PlanDetailTab;
  selectedDay: number;
  updateList: (updatedList: Schedule[]) => void;
  isEditMode: boolean;
  onClickAdd?: () => void;
  onClickDelete?: () => void;
  handleChangeSelectedDay: (day: number) => void;
}

// 일정 상세 블록 데이터 매핑 함수
function createBlockData(schedule: ScheduleWithKey, baseData: BaseData) {
  if (schedule.dtype === 'GENERAL') {
    const { schedule_general: scheduleGeneral } = schedule;
    if (!scheduleGeneral) return;
    const blockData: PlaceBlockDetailData = {
      ...baseData,
      name: scheduleGeneral.place_name,
      placeId: scheduleGeneral.google_map_place_id,
      lat: scheduleGeneral.google_map_latitude,
      lng: scheduleGeneral.google_map_longitude,
      address: scheduleGeneral.google_map_address,
      phone: scheduleGeneral.google_map_phone_number,
      homepage: scheduleGeneral.google_map_home_page_url
    };
    return blockData;
  }

  if (schedule.dtype === 'TRANSPORT') {
    const { schedule_transport: scheduleTransport } = schedule;
    if (!scheduleTransport) return;
    const blockData: TransportBlockDetailData = {
      ...baseData,
      name: scheduleTransport.start_place_name,
      transport: scheduleTransport.transportation,
      address: scheduleTransport.google_map_start_place_address,
      lat: scheduleTransport.google_map_start_latitude,
      lng: scheduleTransport.google_map_start_longitude,
      secondPlaceName: scheduleTransport.end_place_name,
      secondPlaceAddress: scheduleTransport.google_map_end_place_address,
      secondPlaceLat: scheduleTransport.google_map_end_latitude,
      secondPlaceLng: scheduleTransport.google_map_end_longitude
    };
    return blockData;
  }

  if (schedule.dtype === 'ETC') {
    const { schedule_etc: scheduleEtc } = schedule;
    if (!scheduleEtc) return;
    const blockData: EtcBlockDetailData = {
      ...baseData,
      name: scheduleEtc.place_name
    };
    return blockData;
  }

  return;
}

// 컴포넌트
export default function PlanDetailDragAndDrop({
  initList,
  startAt,
  endAt,
  selectedTab,
  selectedDay,
  updateList,
  isLoaded,
  loadError,
  isEditMode,
  onClickAdd = () => {},
  onClickDelete = () => {},
  handleChangeSelectedDay
}: PlanDetailDragAndDropProps) {
  const { isMatch: isTablet } = useMediaQuery('min', 768);
  const [scheduleListWithKey, setScheduleListWithKey] = useState<ScheduleWithKey[][]>([]);
  const [columnKeyList, setColumnKeyList] = useState<string[]>([]);
  const { openModal, closeModal } = useContextModal();
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);

  const columnCount = getDayNum(endAt, startAt, endAt);

  // 아이템 재정렬
  const reorder = (list: ScheduleWithKey[], startIdx: number, endIdx: number): ScheduleWithKey[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0, removed);

    return result.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));
  };

  // 아이템 이동
  const move = (
    source: ScheduleWithKey[],
    destination: ScheduleWithKey[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const srcClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = srcClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const updatedSource: ScheduleWithKey[] = srcClone.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    const newVisitedDate = getDateFromDayNum(+droppableDestination.droppableId + 1, startAt, endAt) || endAt;

    const updatedDestination: ScheduleWithKey[] = destClone.map((item, index) => ({
      ...item,
      sort_order: index + 1,
      visited_date: newVisitedDate
    }));

    const result: { [key: string]: ScheduleWithKey[] } = {};
    result[droppableSource.droppableId] = updatedSource;
    result[droppableDestination.droppableId] = updatedDestination;

    return result;
  };

  // 드래그 종료
  const handleDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const selectedDay = Number(destination.droppableId) + 1;
    handleChangeSelectedDay(selectedDay);

    const srcIdx = +source.droppableId;
    const destIdx = +destination.droppableId;

    if (srcIdx === destIdx) {
      const reorderedList = reorder(scheduleListWithKey[srcIdx], source.index, destination.index);
      const newScheduleList = [...scheduleListWithKey];
      newScheduleList[srcIdx] = reorderedList;
      setScheduleListWithKey(newScheduleList);
      return;
    }

    const movedList = move(scheduleListWithKey[srcIdx], scheduleListWithKey[destIdx], source, destination);
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[srcIdx] = movedList[srcIdx];
    newScheduleList[destIdx] = movedList[destIdx];
    setScheduleListWithKey(newScheduleList);
  };

  // 아이템 삭제
  const handleDeleteItem = (columnIdx: number, itemIdx: number) => {
    const newScheduleList = [...scheduleListWithKey];
    const deletedSchedule = newScheduleList[columnIdx].splice(itemIdx, 1)[0];

    const updatedColumn: ScheduleWithKey[] = newScheduleList[columnIdx].map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    newScheduleList[columnIdx] = updatedColumn;

    setScheduleListWithKey(newScheduleList);
    onClickDelete();

    return deletedSchedule;
  };

  // 숙소, 식당, 관광지, 액티비티 블록 생성
  const handlePlaceSelect: OnPlaceSelect<{ columnIdx: number }> = ({ category, place, columnIdx }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: `item-${new Date().getTime()}`,
      visited_date: newVisitedDate,
      sort_order: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'GENERAL',
      schedule_general: {
        place_name: place.displayName.text || '빈 이름',
        google_map_place_id: place.id || '',
        google_map_latitude: place.location?.latitude || 0,
        google_map_longitude: place.location?.longitude || 0,
        google_map_address: place.formattedAddress || '',
        google_map_phone_number:
          (place.internationalPhoneNumber?.startsWith('+82')
            ? place.nationalPhoneNumber
            : place.internationalPhoneNumber) || '',
        google_map_home_page_url: place.websiteUri || ''
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];
    setScheduleListWithKey(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 교통 블록 생성
  const handleTransportSelect: OnTransportSelect<{ columnIdx: number }> = ({
    category,
    transport,
    place,
    secondPlace,
    columnIdx
  }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: `item-${new Date().getTime()}`,
      visited_date: newVisitedDate,
      sort_order: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'TRANSPORT',
      schedule_transport: {
        transportation: transport,
        start_place_name: place.displayName.text || '빈 이름',
        google_map_start_place_address: place.formattedAddress || '',
        google_map_start_latitude: place.location?.latitude || 0,
        google_map_start_longitude: place.location?.longitude || 0,
        end_place_name: secondPlace.displayName.text || '빈 이름',
        google_map_end_place_address: secondPlace.formattedAddress || '',
        google_map_end_latitude: secondPlace.location?.latitude || 0,
        google_map_end_longitude: secondPlace.location?.longitude || 0
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];
    setScheduleListWithKey(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 기타 블록 생성
  const handleEtcSelect: OnEtcSelect<{ columnIdx: number }> = ({ category, name, columnIdx }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: `item-${new Date().getTime()}`,
      visited_date: newVisitedDate,
      sort_order: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'ETC',
      schedule_etc: {
        place_name: name
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];
    setScheduleListWithKey(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 블록 생성 모달 열기 버튼
  const handleCreateBlockModalOpen = (columnIdx: number) => {
    if (!isLoaded) return;

    const selectedDay = columnIdx + 1;
    handleChangeSelectedDay(selectedDay);

    openModal(
      <CreateBlockModal
        className="h-[100vh] max-md:rounded-none md:h-auto md:w-[36.875rem]"
        onPlaceSelect={({ ...props }) => handlePlaceSelect({ ...props, columnIdx })}
        onTransportSelect={({ ...props }) => handleTransportSelect({ ...props, columnIdx })}
        onEtcSelect={({ ...props }) => handleEtcSelect({ ...props, columnIdx })}
      />
    );
  };

  // 일정 상세 모달 편집 완료 버튼
  const handleDetailEditSubmit: OnBlockDetailEdit<{ columnIdx: number; itemIdx: number }> = ({
    name,
    secondPlaceName,
    startAt,
    duration,
    budget,
    memo,
    columnIdx,
    itemIdx
  }) => {
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx][itemIdx] = {
      ...newScheduleList[columnIdx][itemIdx],
      visited_time: startAt,
      duration_time: duration,
      expense: budget,
      memo
    };

    const { dtype } = newScheduleList[columnIdx][itemIdx];

    if (dtype === 'GENERAL') {
      if (name) newScheduleList[columnIdx][itemIdx].schedule_general!.place_name = name;
    }

    if (dtype === 'TRANSPORT') {
      if (name) newScheduleList[columnIdx][itemIdx].schedule_transport!.start_place_name = name;
      if (secondPlaceName) newScheduleList[columnIdx][itemIdx].schedule_transport!.end_place_name = secondPlaceName;
    }

    if (dtype === 'ETC') {
      if (name) newScheduleList[columnIdx][itemIdx].schedule_etc!.place_name = name;
    }

    setScheduleListWithKey(newScheduleList);
    closeModal();
  };

  // 비용 모달 편집 완료 버튼
  const handleBudgetEditSubmit: OnBudgetDetailEdit<{ budget: string; columnIdx: number; itemIdx: number }> = ({
    budget,
    columnIdx,
    itemIdx
  }: {
    budget: string;
    columnIdx: number;
    itemIdx: number;
  }) => {
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx][itemIdx] = {
      ...newScheduleList[columnIdx][itemIdx],
      expense: budget
    };
    setScheduleListWithKey(newScheduleList);
    closeModal();
  };

  // 일정 상세 모달 열기 버튼
  const handleBlockDetailModalOpen = (columnIdx: number, itemIdx: number) => {
    const schedule = scheduleListWithKey[columnIdx][itemIdx];
    const { sort_order, category, schedule_general, schedule_transport, schedule_etc } = schedule;

    if (!schedule_general && !schedule_transport && !schedule_etc) return;

    const { visited_time, duration_time, expense, memo } = schedule;

    const baseData: BaseData = {
      category,
      startAt: visited_time,
      duration: duration_time,
      budget: expense,
      memo: memo
    };

    const blockData: BlockData = createBlockData(schedule, baseData);

    if (!blockData) return;

    const selectedDay = columnIdx + 1;
    handleChangeSelectedDay(selectedDay);

    if (selectedTab === 'plan') {
      openModal(
        <BlockDetailModal
          order={sort_order}
          onClose={closeModal}
          blockData={blockData}
          isLoaded={isLoaded}
          loadError={loadError}
          isEditMode={isEditMode}
          onSubmit={({ ...props }) => handleDetailEditSubmit({ ...props, columnIdx, itemIdx })}
        />
      );
    }

    if (selectedTab === 'budget') {
      openModal(
        <BlockDetailBudgetModal
          onClose={closeModal}
          blockData={blockData}
          isEditMode={isEditMode}
          onSubmit={({ ...props }) => handleBudgetEditSubmit({ ...props, columnIdx, itemIdx })}
        />
      );
    }
  };

  useEffect(() => {
    // initList에 mapping용 key가 추가된 ScheduleList 생성
    const initListWithKey: ScheduleWithKey[] = initList.map((item) => ({
      ...item,
      key: `${item.visited_date}${item.sort_order}${new Date().getTime()}` // 고유한 mapping용 key 추가
    }));

    const newScheduleListWithKey: ScheduleWithKey[][] = Array.from({ length: columnCount }, () => []);

    initListWithKey.forEach((item) => {
      const newIdx = getDayNum(item.visited_date, startAt, endAt) - 1;
      const colIdx = newIdx >= 0 ? newIdx : columnCount - 1;
      newScheduleListWithKey[colIdx][item.sort_order - 1] = item;
    });

    // 각 column에 사용할 key 리스트
    for (let idx = 0; idx < columnCount; idx += 1) {
      columnKeyList[idx] = `columnKey-${idx}`;
    }

    setScheduleListWithKey(newScheduleListWithKey);
    setColumnKeyList(columnKeyList);
  }, []);

  // updateList 호출
  useEffect(() => {
    const updatedScheduleListWithKey = scheduleListWithKey.flat();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedScheduleList: Schedule[] = updatedScheduleListWithKey.map(({ key, ...item }) => item);
    updateList(updatedScheduleList);
  }, [scheduleListWithKey]);

  useEffect(() => {
    // 선택한 날짜로 스크롤
    const handleScrollToSelectedDay = (day: number) => {
      const selectedDayRef = columnRefs.current[day - 1];
      selectedDayRef?.scrollIntoView({
        behavior: 'smooth',
        block: isTablet ? 'nearest' : 'start',
        inline: isTablet ? 'nearest' : 'start'
      });
    };
    handleScrollToSelectedDay(selectedDay);
  }, [selectedDay]);

  return (
    <div className="scrollbar flex h-1 grow overflow-auto px-5 pt-1 max-md:flex-col max-md:pb-10 md:px-4 xl:px-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        {scheduleListWithKey.map((list, columnIdx) => (
          <div
            className="flex-col-center w-full md:w-72 md:min-w-80 md:px-3"
            key={columnKeyList[columnIdx]}
            ref={(e) => {
              columnRefs.current[columnIdx] = e;
            }}
          >
            <DayHeader columnIdx={columnIdx} startAt={startAt} endAt={endAt} />
            <Droppable droppableId={`${columnIdx}`} isDropDisabled={!isEditMode}>
              {(listProvided) => (
                <div
                  className={`flex-col-center w-full gap-3 pb-8 md:gap-4`}
                  ref={listProvided.innerRef}
                  {...listProvided.droppableProps}
                >
                  {list.map((schedule, itemIdx) => (
                    <Draggable
                      key={schedule.key}
                      draggableId={schedule.key}
                      index={itemIdx}
                      disableInteractiveElementBlocking
                      isDragDisabled={!isEditMode}
                    >
                      {(itemProvided) => (
                        <div
                          className="relative w-full bg-white-01"
                          ref={itemProvided.innerRef}
                          {...itemProvided.draggableProps}
                          {...itemProvided.dragHandleProps}
                        >
                          <ScheduleBlock
                            schedule={scheduleListWithKey[columnIdx][itemIdx]}
                            selectedTab={selectedTab}
                            onClick={() => handleBlockDetailModalOpen(columnIdx, itemIdx)}
                          />
                          <ConditionalRender condition={isEditMode}>
                            <Button
                              className="absolute right-4 top-4 size-6 rounded bg-white-01 shadow-button hover:bg-gray-02"
                              onClick={() => handleDeleteItem(columnIdx, itemIdx)}
                            >
                              <TrashSvg width={16} height={16} color={COLORS.BLACK_01} />
                            </Button>
                          </ConditionalRender>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {listProvided.placeholder}
                  <ConditionalRender condition={!list.length && !isEditMode}>
                    <div className="flex h-12 w-full items-center">
                      <p className="font-caption-2 md:font-caption-1 w-full text-center text-gray-01">
                        일정을 추가해주세요.
                      </p>
                    </div>
                  </ConditionalRender>
                  <ConditionalRender condition={isEditMode}>
                    <Button
                      className="btn-light size-full h-12 rounded-md"
                      onClick={() => handleCreateBlockModalOpen(columnIdx)}
                    >
                      <PlusSvg width={20} height={20} />
                    </Button>
                  </ConditionalRender>
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}
