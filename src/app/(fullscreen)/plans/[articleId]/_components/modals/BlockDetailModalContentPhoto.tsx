import { useGetGooglePlacesPhotos } from '@/apis/services/google/places/useService';
import NextClientImage from '@/components/common/images/NextClientImage';

type BlockDetailModalContentPhotoProps = {
  placePhotoName: string;
};

export default function BlockDetailModalContentPhoto({ placePhotoName }: BlockDetailModalContentPhotoProps) {
  const { data: photo } = useGetGooglePlacesPhotos(placePhotoName, { maxWidthPx: 160 * 4, maxHeightPx: 160 * 4 });

  const src = photo?.body.photoUri;

  return <NextClientImage className="aspect-square w-full rounded-md" src={src} alt="placePhoto" sizes={160 * 1.5} />;
}
