'use client';

import { useQuery } from '@tanstack/react-query';

import serviceReissueToken from './fetch';

export default function useReissue() {
  return useQuery({
    queryKey: ['useReissue'],
    queryFn: () => serviceReissueToken.postReissueToken()
  });
}
