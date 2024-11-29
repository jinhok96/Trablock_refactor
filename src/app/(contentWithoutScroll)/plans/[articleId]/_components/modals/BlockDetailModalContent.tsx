import BlockDetailModalContentPlace from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/BlockDetailModalContentPlace';
import BlockDetailModalContentTransport from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/BlockDetailModalContentTransport';
import {
  EtcBlockDetailData,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/app/(contentWithoutScroll)/plans/[articleId]/_types/modalData.type';
import { CATEGORY } from '@/libs/constants/modal';
import { LoadGoogleMapsApiReturn } from '@/libs/hooks/useLoadGoogleMapsApi';

export interface BlockDetailModalContentProps extends LoadGoogleMapsApiReturn {
  order: number;
  blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData;
}

export default function BlockDetailModalContent({
  order,
  blockData,
  isLoaded,
  loadError
}: BlockDetailModalContentProps) {
  if (blockData.category === CATEGORY.기타) return null;
  if (blockData.category === CATEGORY.교통)
    return (
      <BlockDetailModalContentTransport
        order={order}
        isLoaded={isLoaded}
        loadError={loadError}
        blockData={blockData as TransportBlockDetailData}
      />
    );
  return (
    <BlockDetailModalContentPlace
      order={order}
      isLoaded={isLoaded}
      loadError={loadError}
      blockData={blockData as PlaceBlockDetailData}
    />
  );
}
