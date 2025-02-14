import BlockDetailModalContentInfo from '@/app/(fullscreen)/plans/[articleId]/_components/modals/BlockDetailModalContentInfo';
import { TransportBlockDetailData } from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';

type BlockDetailModalContentTransportProps = {
  blockData: TransportBlockDetailData;
};

export default function BlockDetailModalContentTransport({ blockData }: BlockDetailModalContentTransportProps) {
  const { name, address, secondPlaceName, secondPlaceAddress } = blockData;

  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="rounded-md bg-gray-03 px-5 py-4">
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
    </div>
  );
}
