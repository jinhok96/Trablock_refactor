import ImageCore from '@/components/common/images/ImageCore';
import ImagePlaceholder from '@/components/common/images/ImagePlaceholder';
import ImageWrapper from '@/components/common/images/ImageWrapper';
import { NextImageProps } from '@/components/common/images/types';

export default function NextServerImage({ className, placeholderClassName, src, ...restImageProps }: NextImageProps) {
  if (!src) {
    return (
      <ImageWrapper className={className}>
        <ImagePlaceholder className={placeholderClassName} />
      </ImageWrapper>
    );
  }

  return (
    <ImageWrapper className={className}>
      <ImageCore {...restImageProps} src={src} />
    </ImageWrapper>
  );
}
