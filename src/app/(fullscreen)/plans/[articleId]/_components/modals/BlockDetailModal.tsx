import { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from 'react';

import BlockDetailModalContent, {
  BlockDetailModalContentProps
} from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContent';
import { OnBlockDetailEdit } from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/buttons/Button';
import FormInput from '@/components/common/inputs/FormInput';
import Modal, { CustomModalProps } from '@/components/modals/Modal';
import {
  DROPDOWN_AMPM,
  DROPDOWN_HOUR,
  DROPDOWN_MINUTE,
  DropdownAmPm,
  DropdownHour,
  DropdownMinute
} from '@/libs/constants/modal';

// startAt으로부터 오전/오후를 반환하는 함수
function getAmPmFromStartAt(startAt: string): DropdownAmPm {
  const hour = Number(startAt.split(':')[0]);
  if (hour < 12) return '오전';
  return '오후';
}

// startAt으로부터 24H -> 12H로 변환하는 함수
function getHourFromStartAt(startAt: string): DropdownHour {
  const hour = Number(startAt.split(':')[0]) % 12;
  if (hour === 0) return '12';
  if (hour >= 1 && hour <= 9) return `0${hour.toString()}` as DropdownHour;
  return hour.toString() as DropdownHour;
}

// 오전/오후를 반영하여 12H -> 24H로 변환하는 함수
function getHourByAmPm(amPm: DropdownAmPm, hour: DropdownHour) {
  if (amPm === '오전' && hour === '12') return '00';
  if (amPm === '오후') {
    const newHour = Number(hour) + 12;
    if (newHour === 24) return '12';
    return newHour.toString();
  }
  return hour;
}

export interface BlockDetailModalProps extends CustomModalProps, BlockDetailModalContentProps {
  onSubmit: OnBlockDetailEdit;
  isEditMode: boolean;
  onClose: () => void;
}

// edit 모드 여부 설정해야 함
export default function BlockDetailModal({
  order,
  blockData,
  onSubmit,
  isLoaded,
  loadError,
  isEditMode,
  onClose,
  ...modalProps
}: BlockDetailModalProps) {
  const { category, name: initPlaceName, startAt, duration, memo } = blockData;

  const initSecondPlaceName = 'secondPlaceName' in blockData ? blockData.secondPlaceName : '';

  const [placeName, setPlaceName] = useState(initPlaceName);
  const [secondPlaceName, setSecondPlaceName] = useState(initSecondPlaceName);
  const [amPm, setAmPm] = useState<DropdownAmPm>(getAmPmFromStartAt(startAt));
  const [startAtTime, setStartAtTime] = useState<{ hour: DropdownHour; minute: DropdownMinute }>({
    hour: getHourFromStartAt(startAt.split(':')[0]),
    minute: startAt.split(':')[1] as DropdownMinute
  });
  const [durationTime, setDurationTime] = useState<{ hour: DropdownHour; minute: DropdownMinute }>({
    hour: duration.split(':')[0] as DropdownHour,
    minute: duration.split(':')[1] as DropdownMinute
  });
  const [memoValue, setMemoValue] = useState(memo);

  // 드롭다운 입력
  const handleDropdownSelect: Record<
    'amPm' | 'startAtHour' | 'startAtMinute' | 'durationHour' | 'durationMinute',
    ChangeEventHandler<HTMLInputElement>
  > = {
    amPm: (e: ChangeEvent<HTMLInputElement>) => {
      const newAmPm = e.target.value as DropdownAmPm;
      setAmPm(newAmPm);
    },
    startAtHour: (e: ChangeEvent<HTMLInputElement>) => {
      const hour = e.target.value as DropdownHour;
      setStartAtTime({ ...startAtTime, hour });
    },
    startAtMinute: (e: ChangeEvent<HTMLInputElement>) => {
      const minute = e.target.value as DropdownMinute;
      setStartAtTime({ ...startAtTime, minute });
    },
    durationHour: (e: ChangeEvent<HTMLInputElement>) => {
      const hour = e.target.value as DropdownHour;
      setDurationTime({ ...durationTime, hour });
    },
    durationMinute: (e: ChangeEvent<HTMLInputElement>) => {
      const minute = e.target.value as DropdownMinute;
      setDurationTime({ ...durationTime, minute });
    }
  };

  const handlePlaceNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaceName(e.target.value);
  };

  const handleSecondPlaceNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPlaceName(e.target.value);
  };

  const handleMemoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemoValue(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newHour = getHourByAmPm(amPm, startAtTime.hour);
    const newStartAt = `${newHour}:${startAtTime.minute}`;
    const newDuration = `${durationTime.hour}:${durationTime.minute}`;
    const newBlockData = { ...blockData, startAt: newStartAt, duration: newDuration, memo: memoValue };

    if (placeName) {
      newBlockData.name = placeName;
    }

    if (secondPlaceName && 'secondPlaceName' in newBlockData) {
      newBlockData.secondPlaceName = secondPlaceName;
    }

    if (onSubmit) onSubmit(newBlockData);
  };

  const handleSubmitButtonClick = () => {
    if (isEditMode) return;
    onClose();
  };

  return (
    <Modal
      {...modalProps}
      className={`${modalProps.className} ${blockData.category === '기타' ? 'md:w-[28rem]' : 'md:w-[36rem]'}`}
      mobileFullscreen
    >
      <div className="mb-10">
        <Badge type={category} className="mb-1.5">
          {category}
        </Badge>
        <div className="modal-h1 mb-3">
          <p className={`${isEditMode && 'hidden'}`}>
            {placeName}
            <span className={`${!secondPlaceName && 'hidden'}`}>{' → ' + secondPlaceName}</span>
          </p>
          <form className={`flex-row-center gap-1 ${!isEditMode && 'hidden'}`} onSubmit={handleSubmit}>
            <FormInput
              id="placeName"
              containerClassName="w-full"
              className={`w-full rounded-md border border-solid border-gray-01 px-4 py-3 ${!isEditMode && 'hidden'}`}
              value={placeName}
              placeholder={initPlaceName}
              onChange={handlePlaceNameChange}
            />
            <span className={`${category !== '교통' && 'hidden'}`}>→</span>
            <FormInput
              id="secondPlaceName"
              containerClassName={`w-full ${category !== '교통' && 'hidden'}`}
              className="w-full rounded-md border border-solid border-gray-01 px-4 py-3"
              value={secondPlaceName}
              placeholder={initSecondPlaceName}
              onChange={handleSecondPlaceNameChange}
            />
            <Button type="submit" onClick={handleSubmitButtonClick} className="hidden" />
          </form>
        </div>
        <BlockDetailModalContent order={order} blockData={blockData} isLoaded={isLoaded} loadError={loadError} />
      </div>
      {/* 시간 섹션 */}
      <div className={`${!isEditMode && 'grid grid-cols-2'}`}>
        {/* 방문 시간 */}
        <div className="z-10 mb-10">
          <p className="modal-h2 mb-3">방문 시간</p>
          <div className={`flex-row-center gap-3 ${!isEditMode && 'hidden'}`}>
            <FormInput
              id="amPm"
              type="dropdown"
              dropdownClassName="w-full"
              dropdownMenuClassName="text-center"
              dropdownDefaultKey={amPm}
              dropdownList={DROPDOWN_AMPM}
              onChange={handleDropdownSelect.amPm}
            />
            <div className="flex-row-center gap-1">
              <FormInput
                id="startAtHour"
                type="dropdown"
                dropdownClassName="h-[9rem] w-full"
                dropdownMenuClassName="text-center"
                dropdownDefaultKey={startAtTime.hour}
                dropdownList={DROPDOWN_HOUR}
                onChange={handleDropdownSelect.startAtHour}
              />
              <p>시</p>
            </div>
            <div className="flex-row-center gap-1">
              <FormInput
                id="startAtMinute"
                type="dropdown"
                dropdownClassName="h-[9rem] w-full"
                dropdownMenuClassName="text-center"
                dropdownDefaultKey={startAtTime.minute}
                dropdownList={DROPDOWN_MINUTE}
                onChange={handleDropdownSelect.startAtMinute}
              />
              <p>분</p>
            </div>
          </div>
          <p className={`${isEditMode && 'hidden'}`}>
            {amPm} {Number(startAtTime.hour)}시 {Number(startAtTime.minute)}분
          </p>
        </div>
        {/* 소요 시간 */}
        <div className="mb-10">
          <p className="modal-h2 mb-3">소요 시간</p>
          <div className={`flex-row-center gap-3 ${!isEditMode && 'hidden'}`}>
            <div className="flex-row-center gap-1">
              <FormInput
                id="durationHour"
                type="dropdown"
                dropdownClassName="h-[9rem] w-full"
                dropdownMenuClassName="text-center"
                dropdownDefaultKey={durationTime.hour}
                dropdownList={[{ key: '00', value: '00' }, ...DROPDOWN_HOUR]}
                onChange={handleDropdownSelect.durationHour}
              />
              <p>시간</p>
            </div>
            <div className="flex-row-center gap-1">
              <FormInput
                id="durationMinute"
                type="dropdown"
                dropdownClassName="h-[9rem] w-full"
                dropdownMenuClassName="text-center"
                dropdownDefaultKey={durationTime.minute}
                dropdownList={DROPDOWN_MINUTE}
                onChange={handleDropdownSelect.durationMinute}
              />
              <p>분</p>
            </div>
          </div>
          <p className={`${isEditMode && 'hidden'}`}>
            {Number(durationTime.hour)}시간 {Number(durationTime.minute)}분
          </p>
        </div>
      </div>
      {/* 메모 */}
      <form className="flex grow flex-col justify-between" onSubmit={handleSubmit}>
        <div>
          <p className="modal-h2 mb-3">메모</p>
          <div className="mb-10">
            <FormInput
              id="blockDetailMemo"
              className={`w-full rounded-md border border-solid border-gray-01 px-4 py-3 ${!isEditMode && 'hidden'}`}
              value={memoValue}
              placeholder="메모를 입력하세요."
              onChange={handleMemoChange}
            />
            <p className={`${isEditMode && 'hidden'}`}>{memoValue}</p>
          </div>
        </div>
        <Button
          type={isEditMode ? 'submit' : 'button'}
          onClick={handleSubmitButtonClick}
          className="btn-lg btn-solid w-full flex-shrink-0"
        >
          확인
        </Button>
      </form>
    </Modal>
  );
}
