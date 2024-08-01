import { useEffect, useState } from 'react';

export default function useGoogleMapsPlaceSearch() {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
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

        const request: google.maps.places.TextSearchRequest = {
          query,
          language: 'ko'
        };

        service.textSearch(request, (results, status) => {
          setLoading(false); // 로딩 상태 종료

          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPlaces(results);
            setError(null);
          } else {
            setPlaces([]);
            setError('검색 결과가 없습니다.');
          }
        });
      } catch (catchError: any) {
        setLoading(false); // 로딩 상태 종료
        console.error('Error loading Google Maps API', catchError);
        setError(catchError.message);
      }
    };

    if (query) {
      handleSearch();
    } else {
      setPlaces([]);
      setError(null);
    }
  }, [query]);

  return { query, setQuery, places, error, loading };
}
