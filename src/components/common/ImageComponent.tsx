import Image, { ImageProps } from 'next/image';

interface ImageBoxProps extends Omit<ImageProps, 'width' | 'height'> {
  placeholderClassName?: string;
  width: number;
  height: number;
}

export default function ImageBox({
  className,
  placeholderClassName,
  src,
  alt = '',
  width,
  height,
  loading = 'lazy',
  ...restImageProps
}: ImageBoxProps) {
  if (!src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className={`size-full ${placeholderClassName}`} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        {...restImageProps}
        className="image-cover"
        src={src}
        alt={alt}
        width={width * 4}
        height={height * 4}
        loading={loading}
      />
    </div>
  );
}
