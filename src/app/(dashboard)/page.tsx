'use client';

import { useEffect, useState } from 'react';

import AsyncBoundary from '@/components/common/AsyncBoundary';
import AddScheduleButton from '@/components/common/buttons/AddScheduleButton';
import ArrowButton from '@/components/common/buttons/ArrowButton';
import DayChipButton from '@/components/common/buttons/DayChipButton';
import TagChipButton from '@/components/common/buttons/TagChipButton';
import ToggleButton from '@/components/common/buttons/ToggleButton';
import MoneyInput from '@/components/common/inputs/MoneyInput';

// function TestApiComponent() {
//   const payload: PostPwInquiryRenewalPayload = {
//     username: 'asdf@asdf.com',
//     password: 'asdfasdf1!',
//     pw_question_id: 1,
//     answer: 'asdf'
//   };

//   const { mutate, data } = usePostPwInquiryRenewal();

//   const handleMutateClick = async () => {
//     console.log('뮤테이트', payload);
//     mutate(payload, {
//       onSuccess: (res) => {
//         consoleLogApiResponse(res);
//       }
//     });
//   };

//   return (
//     <>
//       <button className="btn-lg btn-solid text-center" type="button" onClick={handleMutateClick}>
//         뮤테이트
//       </button>
//       {JSON.stringify(data?.body)}
//     </>
//   );
// }

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  const [money, setMoney] = useState('0');

  useEffect(() => {
    console.log('money', money);
  }, [money]);

  return (
    <div className="w-full">
      <AsyncBoundary errorFallback={<div>error</div>} loadingFallback={<div>loading</div>}>
        <AddScheduleButton className="w-40" />
        <ArrowButton direction="right" />
        <DayChipButton selected>Day 1</DayChipButton>
        <DayChipButton>Day 1</DayChipButton>
        <TagChipButton selected>혼자서</TagChipButton>
        <TagChipButton>혼자서</TagChipButton>
        <ToggleButton on={isOn} onClick={() => setIsOn(!isOn)} />
        <MoneyInput
          className="bg-gray-02"
          defaultValue={money}
          onChange={(e) => setMoney(e.target.value)}
          placeholder="입력하세요"
          emptyValue={'0'}
        />
      </AsyncBoundary>
    </div>
  );
}
