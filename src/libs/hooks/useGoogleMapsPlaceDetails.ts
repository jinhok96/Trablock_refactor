/* eslint-disable no-undef */

'use client';

import { useEffect, useState } from 'react';

export default function useGoogleMapsPlaceDetails(placeId: string) {
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleSearch = () => {
      setLoading(true); // 로딩 상태 시작

      try {
        if (!google || !google.maps || !google.maps.places) {
          console.log('Google Maps JavaScript API failed to load');
          throw new Error('서버에 연결할 수 없습니다.');
        }

        const service = new google.maps.places.PlacesService(document.createElement('div'));

        const request: google.maps.places.PlaceDetailsRequest = {
          placeId,
          language: 'ko'
        };

        service.getDetails(request, (results, status) => {
          setLoading(false); // 로딩 상태 종료

          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPlace(results);
            setError(null);
          } else {
            setPlace(null);
            setError('검색 결과가 없습니다.');
          }
        });
      } catch (catchError: any) {
        setLoading(false); // 로딩 상태 종료
        console.error('Error loading Google Maps API', catchError);
        setError(catchError.message);
      }
    };

    handleSearch();
  }, [placeId]);

  return { place, error, loading };
}
