'use client';

import Cookies from 'js-cookie';

import useReissue from '@/apis/hooks/useReissue/useReissue';

export default function SetNewToken() {
  const { data: reissueData, isError, isSuccess } = useReissue();
  if (isSuccess) {
    const newAuthToken = reissueData.headers.get('authorization-token');
    Cookies.set('Authorization-Token', newAuthToken);
  }
  if (isError) {
    console.error('토큰 갱신 실패');
  }
}
