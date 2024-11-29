import { useEffect, useState } from 'react';

import { EmblaCarouselType } from 'embla-carousel';

type UseEmblaCarouselDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export default function useEmblaCarouselDotButton(
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseEmblaCarouselDotButtonType {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    if (onButtonClick) onButtonClick(emblaApi);
  };

  const onInit = (emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  };

  const onSelect = (emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  };
}
