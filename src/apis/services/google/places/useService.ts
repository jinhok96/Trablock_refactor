import { useMutation, useQuery } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import googlePlacesServices from '@/apis/services/google/places/fetch';
import {
  PostGooglePlacesAutocompletePayload,
  PostGooglePlacesSearchTextPayload
} from '@/apis/services/google/places/type';

export function usePostGooglePlacesSearchText() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostGooglePlacesSearchText'] as const,
    mutationFn: (payload: PostGooglePlacesSearchTextPayload) => googlePlacesServices.postSearchText(payload),
    throwOnError: true
  });
}

export function useGetGooglePlacesGetDetail(placeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GOOGLE_PLACES, 'useGetGooglePlacesGetDetail', placeId] as const,
    queryFn: () => googlePlacesServices.getDetail(placeId),
    enabled: !!placeId
  });
}

export function useGetGooglePlacesGetPhotos(name: string, options?: { maxWidthPx?: number; maxHeightPx?: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GOOGLE_PLACES, 'useGetGooglePlacesGetPhotos', name, options] as const,
    queryFn: () => googlePlacesServices.getPhotos(name, options),
    enabled: !!name
  });
}

export function usePostGooglePlacesAutocomplete() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePostGooglePlacesAutocomplete'] as const,
    mutationFn: (payload: PostGooglePlacesAutocompletePayload) => googlePlacesServices.postAutocomplete(payload),
    throwOnError: true
  });
}
