'use client';

import { useState } from 'react';

import ConditionalRender from '@/components/common/ConditionalRender';
import ImageCore from '@/components/common/images/ImageCore';
import ImagePlaceholder from '@/components/common/images/ImagePlaceholder';
import ImageWrapper from '@/components/common/images/ImageWrapper';
import { NextImageProps } from '@/components/common/images/types';

export default function NextClientImage({
  className,
  placeholderClassName,
  src,
  onLoad,
  onError,
  ...restImageProps
}: NextImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <ImageWrapper className={className}>
        <ImagePlaceholder className={placeholderClassName} />
      </ImageWrapper>
    );
  }

  return (
    <ImageWrapper className={className}>
      <ConditionalRender condition={!isLoaded}>
        <ImagePlaceholder className={placeholderClassName} animate />
      </ConditionalRender>
      <ImageCore
        {...restImageProps}
        src={src}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          console.log('에러');
          setError(true);
          onError?.(e);
        }}
      />
    </ImageWrapper>
  );
}
