import { ReactNode } from 'react';

import { ImageProps } from 'next/image';

export type ImageWrapperProps = { className?: string; children: ReactNode };

export type ImagePlaceholderProps = {
  className?: string;
  animate?: boolean;
};

export interface ImageCoreProps extends Omit<ImageProps, 'width' | 'height' | 'sizes' | 'fill' | 'loading'> {
  sizes: number | string;
}

export interface NextImageProps extends Omit<ImageCoreProps, 'src'> {
  placeholderClassName?: string;
  src?: ImageProps['src'];
}
