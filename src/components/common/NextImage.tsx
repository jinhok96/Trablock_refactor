import { useState } from 'react';

import Image, { ImageProps } from 'next/image';

export interface NextImageProps extends Omit<ImageProps, 'width' | 'height' | 'src'> {
  placeholderClassName?: string;
  width: number;
  height: number;
  src?: ImageProps['src'];
}

export default function NextImage({
  className,
  placeholderClassName,
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  priority,
  style,
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
    <div className={`overflow-hidden ${className}`} style={style}>
      <div className={`size-full bg-gray-02 ${placeholderClassName} ${isLoaded && 'hidden'}`} />
      <Image
        {...restImageProps}
        className="image-cover"
        src={src}
        alt={alt}
        width={width * 2}
        height={height * 2}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : loading}
        priority={priority}
      />
    </div>
  );
}
