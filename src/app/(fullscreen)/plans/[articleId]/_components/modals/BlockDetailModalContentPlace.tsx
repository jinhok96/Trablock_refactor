import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useGetGooglePlacesDetail } from '@/apis/services/google/places/useService';
import BlockDetailModalContentInfo from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentInfo';
import BlockDetailModalContentPhoto from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentPhoto';
import { PlaceBlockDetailData } from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';
import ConditionalRender from '@/components/common/ConditionalRender';
import LinkSvg from '@/icons/link.svg';
import { COLORS } from '@/libs/constants/colors';

type BlockDetailModalContentPlaceProps = {
  blockData: PlaceBlockDetailData;
};

export default function BlockDetailModalContentPlace({ blockData }: BlockDetailModalContentPlaceProps) {
  const { placeId } = blockData;
  const [photoNameList, setPhotoNameList] = useState<string[]>([]);
  const { data: place, isPending, error } = useGetGooglePlacesDetail(placeId);

  if (!place) return;

  const { formattedAddress, nationalPhoneNumber, internationalPhoneNumber, websiteUri } = place.body;
  const phoneNumber = internationalPhoneNumber?.startsWith('+82') ? nationalPhoneNumber : internationalPhoneNumber;

  // 장소 사진 업데이트
  useEffect(() => {
    const newPhotoNameList = place.body.photos?.slice(0, 6).map((photo) => photo.name) || [];
    setPhotoNameList(newPhotoNameList);
  }, [blockData, place]);

  if (!place.body || error) return;
  if (isPending) return <div className="h-60 w-full rounded-md bg-gray-02" />;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <ConditionalRender condition={photoNameList.length > 0}>
        <div className="grid grid-cols-3 grid-rows-2 justify-between gap-1 md:gap-2">
          {photoNameList.map((name) => (
            <BlockDetailModalContentPhoto key={name} placePhotoName={name} />
          ))}
        </div>
      </ConditionalRender>
      <div className="flex w-full flex-col gap-2 rounded-md bg-gray-03 px-5 py-4">
        <BlockDetailModalContentInfo label="주소">{formattedAddress}</BlockDetailModalContentInfo>
        <ConditionalRender condition={!!phoneNumber}>
          <BlockDetailModalContentInfo label="전화">{phoneNumber}</BlockDetailModalContentInfo>
        </ConditionalRender>
        <ConditionalRender condition={!!websiteUri}>
          <BlockDetailModalContentInfo label="홈페이지">
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
        </ConditionalRender>
      </div>
    </div>
  );
}
