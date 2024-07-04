'use client';

import { useSearchParams } from 'next/navigation';

import usePostKakaoToken from '@/apis/hooks/usePostKakao/usePostKakaoToken';

export default function ManageKakaoLogin() {
  const params = useSearchParams();
  const code = params.get('code');
  const error = params.get('error');
  const errorDescription = params.get('error_description');

  const { mutate: postKakaoTokenMutate } = usePostKakaoToken();

  if (code) {
    // kakao에 post 보내기
    postKakaoTokenMutate(code, {
      onSuccess: (response) => {
        return response;
        // 토큰 저장 (엑세스 토큰과 리프레시 토큰 , 각각의 만료시간 저장)
        // 이후 토큰 정보보기 ㄲ / https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#get-token-info
        // 이후 사용자 정보 가져오기
        // 이후 가져온 사용자 정보 백엔드에 전달
      }
    });
  }
  if (error) {
    alert(errorDescription);
  }
  return null;
}
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import usePostKakaoToken from '@/apis/hooks/usePostKakao/usePostKakaoToken';

// export default function useManageKakaoLogin() {
//   const params = useSearchParams();
//   const code = params.get('code');
//   const error = params.get('error');
//   const errorDescription = params.get('error_description');

//   const { mutate: postKakaoTokenMutate } = usePostKakaoToken();
//   const [tokenData, setTokenData] = useState(null);

//   useEffect(() => {
//     if (code) {
//       postKakaoTokenMutate(code, {
//         onSuccess: (response) => {
//           setTokenData(response);
//         }
//       });
//     }
//     if (error) {
//       alert(errorDescription);
//     }
//   }, [code, error, errorDescription, postKakaoTokenMutate]);

//   return tokenData;
// }
