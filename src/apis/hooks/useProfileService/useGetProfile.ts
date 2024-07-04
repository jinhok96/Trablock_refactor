'use client';

import { useQuery } from '@tanstack/react-query';

import profileService from './fetchGetProfile';
import { ProfileUserData } from './type';
// fetch
export default function useGetProfile(id: string) {
  const query = useQuery<ProfileUserData, Error>({
    queryKey: ['useGetProfile', id],
    queryFn: () => profileService.getProfile(id)
  });

  return query;
}
