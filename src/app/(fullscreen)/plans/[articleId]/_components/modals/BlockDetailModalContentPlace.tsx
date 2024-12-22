import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useGetGooglePlacesDetail } from '@/apis/services/google/places/useService';
import BlockDetailModalContentInfo from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentInfo';
import BlockDetailModalContentPhoto from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentPhoto';
import { PlaceBlockDetailData } from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';
import { MapMarker, MapMarkerList } from '@/components/features/maps/type';
import LinkSvg from '@/icons/link.svg';
import { COLORS } from '@/libs/constants/colors';
import { LoadGoogleMapsApiReturn } from '@/libs/hooks/useLoadGoogleMapsApi';

const Map = dynamic(() => import('@/components/features/maps/Map'), { ssr: false });

interface BlockDetailModalContentPlaceProps extends LoadGoogleMapsApiReturn {
  order: number;
  blockData: PlaceBlockDetailData;
}

export default function BlockDetailModalContentPlace({
  order,
  blockData,
  isLoaded,
  loadError
}: BlockDetailModalContentPlaceProps) {
  const { placeId, category, lat, lng } = blockData;
  const [mapMarkerList, setMapMarkerList] = useState<MapMarkerList>();
  const [photoNameList, setPhotoNameList] = useState<string[]>([]);
  const { data: place, isPending, error } = useGetGooglePlacesDetail(placeId);

  if (!place) return;

  const { formattedAddress, nationalPhoneNumber, internationalPhoneNumber, websiteUri } = place.body;
  const phoneNumber = internationalPhoneNumber?.startsWith('+82') ? nationalPhoneNumber : internationalPhoneNumber;

  useEffect(() => {
    // 지도 마커 업데이트
    const newMapMarker: MapMarker = {
      order,
      category,
      coordinate: { lat, lng }
    };
    setMapMarkerList([newMapMarker]);

    // 장소 사진 업데이트
    const newPhotoNameList = place.body.photos?.slice(0, 3).map((photo) => photo.name) || [];
    setPhotoNameList(newPhotoNameList);
  }, [blockData, place]);

  if (!place.body || error) return;
  if (!isLoaded || isPending) return <div className="h-60 w-full rounded-md bg-gray-02" />;

  return (
    <>
      <Map
        className="mb-3 h-60 w-full rounded-md md:mb-4"
        mapMarkerList={mapMarkerList}
        isLoaded={isLoaded}
        loadError={loadError}
      />
      <div className="mb-3 flex w-full flex-col gap-2 rounded-md bg-gray-03 px-5 py-4 md:mb-4">
        <BlockDetailModalContentInfo label="주소">{formattedAddress}</BlockDetailModalContentInfo>
        <BlockDetailModalContentInfo className={`${!phoneNumber && 'hidden'}`} label="전화">
          {phoneNumber}
        </BlockDetailModalContentInfo>
        <BlockDetailModalContentInfo className={`${!websiteUri && 'hidden'}`} label="홈페이지">
          <Link href={websiteUri ? new URL(websiteUri) : ''} target="_blank">
            <LinkSvg
              className="relative -top-px mr-1.5 inline-block shrink-0"
              width={16}
              height={16}
              color={COLORS.BLACK_03}
              strokeWidth={2}
            />
            <span className="break-all">{websiteUri}</span>
          </Link>
        </BlockDetailModalContentInfo>
      </div>
      <div className="flex-row-center justify-between gap-1 md:gap-2">
        {photoNameList.map((name) => (
          <BlockDetailModalContentPhoto key={name} placePhotoName={name} />
        ))}
      </div>
    </>
  );
}
