import NextImage, { NextImageProps } from '@/components/common/NextImage';
import DefaultProfileSvg from '@/icons/default-profile.svg?url';

type ProfileImageProps = NextImageProps;

export default function ProfileImage({ src, className, ...restNextImageProps }: ProfileImageProps) {
  return (
    <NextImage
      {...restNextImageProps}
      className={`shrink-0 rounded-full ${!src && 'border border-gray-02'} ${className}`}
      src={src || DefaultProfileSvg}
    />
  );
}
