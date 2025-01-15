import Image from 'next/image';

import { NextImageProps } from '@/components/common/images/types';

type NextServerImageProps = NextImageProps;

export default function NextServerImage({
  className,
  placeholderClassName,
  src,
  alt,
  sizes,
  loading = 'lazy',
  priority,
  ...restImageProps
}: NextServerImageProps) {
  if (!src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className={`size-full bg-gray-02 ${placeholderClassName}`} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        {...restImageProps}
        className="image-cover"
        src={src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        fill
        sizes={typeof sizes === 'number' ? `${sizes}px` : sizes}
        priority={priority}
      />
    </div>
  );
}
