import BlockDetailModalContentPlace from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentPlace';
import BlockDetailModalContentTransport from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentTransport';
import {
  EtcBlockDetailData,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';
import { CATEGORY } from '@/libs/constants/modal';

export type BlockDetailModalContentProps = {
  blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData;
};

export default function BlockDetailModalContent({ blockData }: BlockDetailModalContentProps) {
  if (blockData.category === CATEGORY.기타) return null;
  if (blockData.category === CATEGORY.교통)
    return <BlockDetailModalContentTransport blockData={blockData as TransportBlockDetailData} />;
  return <BlockDetailModalContentPlace blockData={blockData as PlaceBlockDetailData} />;
}
