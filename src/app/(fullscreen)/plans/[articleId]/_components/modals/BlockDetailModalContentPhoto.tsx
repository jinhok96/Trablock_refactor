import { useGetGooglePlacesPhotos } from '@/apis/services/google/places/useService';
import NextImage from '@/components/common/images/NextImage';

type BlockDetailModalContentPhotoProps = {
  placePhotoName: string;
};

export default function BlockDetailModalContentPhoto({ placePhotoName }: BlockDetailModalContentPhotoProps) {
  const { data: photo } = useGetGooglePlacesPhotos(placePhotoName, { maxWidthPx: 160 * 4, maxHeightPx: 160 * 4 });

  const src = photo?.body.photoUri;

  return <NextImage className="aspect-square w-full rounded-md" src={src} alt="placePhoto" sizes={160 * 1.5} />;
}
