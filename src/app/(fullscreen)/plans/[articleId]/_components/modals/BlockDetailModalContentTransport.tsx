import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import BlockDetailModalContentInfo from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentInfo';
import { TransportBlockDetailData } from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';
import { MapMarker, MapMarkerList } from '@/components/features/maps/type';
import { LoadGoogleMapsApiReturn } from '@/libs/hooks/useLoadGoogleMapsApi';

const Map = dynamic(() => import('@/components/features/maps/Map'), { ssr: false });

interface BlockDetailModalContentTransportProps extends LoadGoogleMapsApiReturn {
  order: number;
  blockData: TransportBlockDetailData;
}

export default function BlockDetailModalContentTransport({
  order,
  blockData,
  isLoaded,
  loadError
}: BlockDetailModalContentTransportProps) {
  const { category, name, address, lat, lng, secondPlaceName, secondPlaceAddress, secondPlaceLat, secondPlaceLng } =
    blockData;
  const [mapMarkerList, setMapMarkerList] = useState<MapMarkerList>();

  useEffect(() => {
    // 지도 마커 업데이트
    const newStartMapMarker: MapMarker = {
      order,
      category,
      coordinate: { lat, lng },
      transport: 'start'
    };
    const newEndMapMarker: MapMarker = {
      order,
      category,
      coordinate: { lat: secondPlaceLat, lng: secondPlaceLng },
      transport: 'end'
    };
    setMapMarkerList([newStartMapMarker, newEndMapMarker]);
  }, [blockData]);

  if (!isLoaded) return <div className="h-[15rem] w-full rounded-md bg-gray-02" />;
  return (
    <>
      <Map
        className="mb-3 h-60 w-full rounded-md md:mb-4"
        mapMarkerList={mapMarkerList}
        isLoaded={isLoaded}
        loadError={loadError}
      />
      <div className="mb-2 rounded-md bg-gray-03 px-5 py-4">
        <BlockDetailModalContentInfo className="mb-2" label="출발지">
          {name}
        </BlockDetailModalContentInfo>
        <BlockDetailModalContentInfo label="주소">{address}</BlockDetailModalContentInfo>
      </div>
      <div className="rounded-md bg-gray-03 px-5 py-4">
        <BlockDetailModalContentInfo className="mb-2" label="도착지">
          {secondPlaceName}
        </BlockDetailModalContentInfo>
        <BlockDetailModalContentInfo label="주소">{secondPlaceAddress}</BlockDetailModalContentInfo>
      </div>
    </>
  );
}
