import NextClientImage from '@/components/common/images/NextClientImage';
import { NextImageProps } from '@/components/common/images/types';
import DefaultProfileSvg from '@/icons/default-profile.svg?url';

export type ProfileImageProps = NextImageProps;

export default function ProfileImage({ src, className, ...restNextImageProps }: ProfileImageProps) {
  return (
    <NextClientImage
      {...restNextImageProps}
      className={`shrink-0 rounded-full ${!src && 'border border-gray-02'} ${className}`}
      src={src || DefaultProfileSvg}
    />
  );
}
