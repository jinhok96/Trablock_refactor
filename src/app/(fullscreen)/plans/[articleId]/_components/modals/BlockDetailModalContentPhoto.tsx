import { useGetGooglePlacesPhotos } from '@/apis/services/google/places/useService';
import NextImage from '@/components/common/NextImage';

type BlockDetailModalContentPhotoProps = {
  placePhotoName: string;
};

export default function BlockDetailModalContentPhoto({ placePhotoName }: BlockDetailModalContentPhotoProps) {
  const { data: photo } = useGetGooglePlacesPhotos(placePhotoName, { maxWidthPx: 164 * 4, maxHeightPx: 164 * 4 });

  const src = photo?.body.photoUri;

  return <NextImage className="aspect-square w-full rounded-md" src={src} alt="placePhoto" width={164} height={164} />;
}
