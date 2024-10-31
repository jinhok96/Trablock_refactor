import { useGetGooglePlacesPhotos } from '@/apis/services/google/places/useService';
import CoreBlock, {
  CoreBlockProps
} from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/scheduleBlocks/CoreBlock';

interface PlanBlockProps extends Omit<CoreBlockProps, 'imageUrl'> {
  photoName?: string;
}

export default function PlanBlock({
  index,
  photoName,
  name,
  category,
  memo,
  startAt,
  duration,
  onClick,
  ...props
}: PlanBlockProps) {
  const { data } = useGetGooglePlacesPhotos(photoName || '', { maxWidthPx: 103 * 4, maxHeightPx: 103 * 4 });

  if (!data) return;
  const imageUrl = data.ok ? data.body.photoUri : undefined;

  return (
    <CoreBlock
      index={index}
      name={name}
      category={category}
      memo={memo}
      imageUrl={imageUrl}
      startAt={startAt}
      duration={duration}
      onClick={onClick}
      {...props}
    />
  );
}
