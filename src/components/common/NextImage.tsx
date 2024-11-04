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
      <Image
        {...restImageProps}
        className="image-cover"
        src={src}
        alt={alt}
        width={width * 4}
        height={height * 4}
        onError={() => setError(true)}
        loading={priority ? 'eager' : loading}
        priority={priority}
      />
    </div>
  );
}
