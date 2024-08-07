'use client';

import AsyncBoundary from '@/components/common/AsyncBoundary';

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
  return (
    <AsyncBoundary errorFallback={<div>error</div>} loadingFallback={<div>loading</div>}>
      Home
    </AsyncBoundary>
  );
}
