import { PlaceResult } from '@/apis/services/google/places/type';
import { useGetGooglePlacesPhotos } from '@/apis/services/google/places/useService';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/buttons/Button';
import NextImage from '@/components/common/NextImage';
import ChevronSvg from '@/icons/chevron.svg';
import { CHEVRON_DIRECTION } from '@/libs/constants/chevronDirection';
import { COLORS } from '@/libs/constants/colors';
import translatePlaceType from '@/libs/utils/translatePlaceType';

interface PlaceSearchResultItemProps {
  place: PlaceResult;
  onPlaceSelect: (place: PlaceResult) => void;
}

export default function PlaceSearchResultItem({ place, onPlaceSelect }: PlaceSearchResultItemProps) {
  const { id, primaryType, photos, formattedAddress } = place;
  const { data } = useGetGooglePlacesPhotos(photos?.[0].name || '', { maxWidthPx: 87 * 4, maxHeightPx: 87 * 4 });

  if (!place) return null;
  if (!data) return;

  const { name: photoName, photoUri } = data.body;

  return (
    <Button
      key={id}
      className="flex-row-center w-full justify-between py-2 hover:bg-primary-02"
      onClick={() => onPlaceSelect(place)}
    >
      <div className="flex-row-center">
        <NextImage className="size-20 shrink-0 rounded-md" src={photoUri} alt={photoName} width={88} height={88} />
        <div className="ml-3">
          <Badge type="태그" className="mb-1.5">
            {translatePlaceType(primaryType)}
          </Badge>
          <p className="font-subtitle-2 mb-1 line-clamp-1">{place.displayName.text}</p>
          <p className="font-caption-2 line-clamp-1 text-gray-01">{formattedAddress}</p>
        </div>
      </div>
      <ChevronSvg
        className="mx-3 shrink-0"
        width={16}
        height={16}
        color={COLORS.GRAY_01}
        transform={CHEVRON_DIRECTION.RIGHT}
      />
    </Button>
  );
}
