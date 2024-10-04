import { useJsApiLoader } from '@react-google-maps/api';

import { ENV } from '@/libs/constants/env';

export type LoadGoogleMapsApiReturn = {
  isLoaded: boolean;
  loadError?: Error;
};

// Google Maps API 로드
export default function useLoadGoogleMapsApi() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: ENV.GOOGLE_MAPS_API_KEY || '',
    language: 'ko'
  });
  return { isLoaded, loadError };
}
