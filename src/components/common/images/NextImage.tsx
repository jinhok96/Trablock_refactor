'use client';

import { useState } from 'react';

import Image from 'next/image';

import { NextImageProps } from '@/components/common/images/types';

export default function NextImage({
  className,
  placeholderClassName,
  src,
  alt,
  sizes,
  loading = 'lazy',
  priority,
  ...restImageProps
}: NextImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className={`size-full bg-gray-02 ${placeholderClassName}`} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`size-full bg-gray-02 ${placeholderClassName} ${isLoaded && 'hidden'}`} />
      <Image
        {...restImageProps}
        className="image-cover"
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : loading}
        fill
        sizes={typeof sizes === 'number' ? `${sizes}px` : sizes}
        priority={priority}
      />
    </div>
  );
}
