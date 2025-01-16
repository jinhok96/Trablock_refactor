import Image from 'next/image';

import { ImageCoreProps } from '@/components/common/images/types';

export default function ImageCore({ className, sizes, priority, ...restProps }: ImageCoreProps) {
  return (
    <Image
      {...restProps}
      className={`image-cover ${className}`}
      fill
      sizes={typeof sizes === 'number' ? `${sizes}px` : sizes}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
    />
  );
}
