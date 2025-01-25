import { forwardRef } from 'react';

import ProfileImage, { ProfileImageProps } from '@/components/common/profile/ProfileImage';

interface ProfileProps extends Pick<ProfileImageProps, 'src' | 'alt'> {
  containerClassName?: string;
  imageClassName?: string;
  textClassName?: string;
  sizes?: ProfileImageProps['sizes'];
  nickname: string;
}

export default forwardRef<HTMLDivElement, ProfileProps>(function Profile(
  { containerClassName, imageClassName, textClassName, src, alt, sizes, nickname }: ProfileProps,
  ref
) {
  return (
    <div className={`flex-row-center shrink-0 gap-1.5 ${containerClassName}`} ref={ref}>
      <ProfileImage className={`size-7 md:size-8 ${imageClassName}`} src={src} alt={alt} sizes={sizes || 28} priority />
      <span className={`font-caption-2 leading-none ${textClassName}`}>{nickname}</span>
    </div>
  );
});
