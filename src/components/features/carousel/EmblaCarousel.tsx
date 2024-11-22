'use client';

import { useCallback } from 'react';

import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import ArrowButton from '@/components/common/buttons/ArrowButton';
import Button from '@/components/common/buttons/Button';
import { COLORS } from '@/libs/constants/colors';
import useEmblaCarouselDotButton from '@/libs/hooks/useEmblaCarouselDotButton';
import useEmblaCarouselPrevNextButtons from '@/libs/hooks/useEmblaCarouselPrevNextButtons';

type EmblaCarouselProps = {
  className?: string;
  slides: JSX.Element[];
  options?: EmblaOptionsType;
};

export default function EmblaCarousel({ className, slides, options }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useEmblaCarouselDotButton(emblaApi, onNavButtonClick);
  const { onPrevButtonClick, onNextButtonClick } = useEmblaCarouselPrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className={`embla relative select-none ${className}`}>
      {/* Slides */}
      <div className="embla__viewport size-full" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.key}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {/* Counts */}
      <div className="absolute right-5 top-5 w-12 rounded-full bg-black-01/[0.4] py-1 md:hidden">
        <p className="w-full text-center text-sm font-extralight text-white-01">
          {selectedIndex + 1} | {scrollSnaps.length}
        </p>
      </div>
      {/* Dots */}
      <div className="flex-row-center absolute-x-center bottom-5 gap-2 max-md:hidden md:bottom-7">
        {scrollSnaps.map((_, index) => (
          <Button
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`size-3 touch-manipulation appearance-none rounded-full ${index === selectedIndex ? 'bg-primary-01' : 'bg-white-01'}`}
          />
        ))}
      </div>
      {/* Arrows */}
      <div className="*:absolute-y-center *:size-7 *:md:size-8 *:xl:size-9">
        <ArrowButton
          className="left-4 md:left-5"
          direction="LEFT"
          color={COLORS.WHITE_01}
          width="100%"
          height="100%"
          onClick={onPrevButtonClick}
        />
        <ArrowButton
          className="right-4 md:right-5"
          direction="RIGHT"
          color={COLORS.WHITE_01}
          width="100%"
          height="100%"
          onClick={onNextButtonClick}
        />
      </div>
    </section>
  );
}
