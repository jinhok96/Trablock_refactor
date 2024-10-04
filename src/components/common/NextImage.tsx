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
  ...restImageProps
}: NextImageProps) {
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
        loading={priority ? 'eager' : loading}
        priority={priority}
      />
    </div>
  );
}
