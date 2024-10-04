import { useCallback, useEffect, useState } from 'react';

import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import { isEqual } from 'lodash';

import { Coordinate, MapMarker, MapMarkerList } from '@/components/features/maps/type';
import { COLORS } from '@/libs/constants/colors';
import { DEFAULT_COORDINATE_LIST, GOOGLE_MAPS, MAX_ZOOM } from '@/libs/constants/googleMaps';
import { CATEGORY_COLOR } from '@/libs/constants/mapStyle';

const GOOGLE_MAPS_DEFAULT_CENTER: google.maps.LatLngBoundsLiteral = {
  east: -180,
  north: -1,
  south: 1,
  west: 180
};

interface MapProps extends GoogleMapProps {
  className?: string;
  mapMarkerList?: MapMarkerList;
  isLoaded: boolean;
  loadError?: Error;
}

export default function Map({ className, mapMarkerList = [], isLoaded, loadError }: MapProps) {
  const initCenter = mapMarkerList?.[0]?.coordinate || DEFAULT_COORDINATE_LIST[0];

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const [center, setCenter] = useState<Coordinate>(initCenter);

  // 맵 load
  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
      setCenter(initCenter);
    },
    [mapMarkerList]
  );

  // 맵 unmount
  const handleOnUnmount = useCallback(() => {
    markers.forEach((marker) => {
      marker.map = null;
    });
    if (polyline && polyline.getMap()) {
      polyline.setMap(null);
    }
    setMap(null);
  }, [markers, polyline]);

  // 최대 줌 레벨 제한
  const handleLimitMaxZoom = useCallback(() => {
    if (!map) return;
    const currentZoom = map.getZoom() || -1;
    if (currentZoom <= MAX_ZOOM) return;
    map.setZoom(MAX_ZOOM);
  }, [map, MAX_ZOOM]);

  // 커스텀 마커 스타일
  const createMarkerElement = useCallback(
    (mapMarker: MapMarker) => {
      const { order, category, transport } = mapMarker;

      const textContent = () => {
        if (transport === 'start') return `${order}-1`;
        if (transport === 'end') return `${order}-2`;
        return order.toString();
      };

      const markerDiv = document.createElement('div');
      markerDiv.style.backgroundColor = CATEGORY_COLOR[category].bg;
      markerDiv.style.width = '2rem';
      markerDiv.style.height = '2rem';
      markerDiv.style.borderRadius = '50%';
      markerDiv.style.color = CATEGORY_COLOR[category].text;
      markerDiv.style.font = 'Pretendard';
      markerDiv.style.fontWeight = '700';
      markerDiv.style.display = 'flex';
      markerDiv.style.alignItems = 'center';
      markerDiv.style.justifyContent = 'center';
      markerDiv.style.fontSize = '1rem';
      markerDiv.textContent = textContent();
      markerDiv.style.transform = 'translateY(50%)';
      return markerDiv;
    },
    [CATEGORY_COLOR, mapMarkerList]
  );

  // 새로운 마커 추가, 뷰포트 업데이트
  const createMarkerList = useCallback(
    async (mapMarkerList: MapMarkerList, map: google.maps.Map) => {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;
      const newBoundList = new google.maps.LatLngBounds();
      const newMarkerList = mapMarkerList.map((item) => {
        const { coordinate } = item;
        const marker = new AdvancedMarkerElement({
          position: coordinate,
          map,
          content: createMarkerElement(item)
        });
        newBoundList.extend(new google.maps.LatLng(coordinate.lat, coordinate.lng));
        return marker;
      });

      const filteredMarkers = newMarkerList.filter((marker) => marker !== undefined);
      setMarkers(filteredMarkers);

      const isBoundsDefault = isEqual(newBoundList.toJSON(), GOOGLE_MAPS_DEFAULT_CENTER);
      if (isBoundsDefault) {
        map.setCenter(DEFAULT_COORDINATE_LIST[0]);
        map.setZoom(MAX_ZOOM);
        return;
      }
      if (filteredMarkers.length === 1) {
        map.setCenter(newBoundList.getCenter());
        map.setZoom(MAX_ZOOM);
        return;
      }
      map.fitBounds(newBoundList);
    },
    [GOOGLE_MAPS_DEFAULT_CENTER, DEFAULT_COORDINATE_LIST, MAX_ZOOM]
  );

  // 마커, 폴리라인, 뷰포트 업데이트
  useEffect(() => {
    if (!isLoaded || loadError) return;
    if (!map) return;

    createMarkerList(mapMarkerList, map);

    // 기존 폴리라인 초기화
    if (polyline && polyline.getMap()) {
      polyline.setMap(null);
    }

    // 새로운 폴리라인 추가
    const filteredMapMarkerList = mapMarkerList.filter((item) => item.coordinate !== undefined);
    const pathList = filteredMapMarkerList.map(
      (item) => new google.maps.LatLng(item.coordinate.lat, item.coordinate.lng)
    );
    const newPolyline = new google.maps.Polyline({
      path: pathList,
      map,
      strokeColor: COLORS.PRIMARY_01,
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    setPolyline(newPolyline);
  }, [map, mapMarkerList]);

  if (!isLoaded || loadError) return;
  return (
    <div className={`flex grow overflow-hidden ${className}`}>
      <GoogleMap
        mapContainerClassName="grow"
        center={center}
        zoom={MAX_ZOOM}
        onLoad={handleOnLoad}
        onUnmount={handleOnUnmount}
        onIdle={handleLimitMaxZoom}
        options={{
          mapId: GOOGLE_MAPS.MAP_ID,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          keyboardShortcuts: false,
          zoomControl: false
        }}
      />
    </div>
  );
}