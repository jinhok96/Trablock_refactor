import { PlaceResult } from '@/apis/services/google/places/type';
import PlaceSearchEmptyResultMessage from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/PlaceSearchEmptyResultMessage';
import PlaceSearchResultItem from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/PlaceSearchResultItem';

interface PlaceSearchResultProps {
  className?: string;
  places: PlaceResult[];
  onPlaceSelect: (place: PlaceResult) => void;
  isLoading?: boolean;
  error?: string;
}

export default function PlaceSearchResult({
  className,
  places,
  onPlaceSelect,
  isLoading,
  error
}: PlaceSearchResultProps) {
  const containerStyle = `scrollbar-styled scrollbar h-full w-full overflow-auto max-md:mb-5 max-md:scrollbar-hide md:h-[24.75rem] ${className}`;

  if (isLoading) {
    return (
      <div className={containerStyle}>
        <PlaceSearchEmptyResultMessage>검색 중...</PlaceSearchEmptyResultMessage>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerStyle}>
        <PlaceSearchEmptyResultMessage>{error}</PlaceSearchEmptyResultMessage>
      </div>
    );
  }

  if (!places?.length) {
    return (
      <div className={containerStyle}>
        <PlaceSearchEmptyResultMessage>검색 결과가 없습니다.</PlaceSearchEmptyResultMessage>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      {places.map((place) => (
        <PlaceSearchResultItem key={place.id} place={place} onPlaceSelect={onPlaceSelect} />
      ))}
    </div>
  );
}
