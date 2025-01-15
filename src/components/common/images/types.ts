import { ImageProps } from 'next/image';

export interface NextImageProps extends Omit<ImageProps, 'width' | 'height' | 'src' | 'sizes'> {
  placeholderClassName?: string;
  sizes: number | string;
  src?: ImageProps['src'];
}
