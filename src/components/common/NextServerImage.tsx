import Image, { ImageProps } from 'next/image';

export interface NextServerImageProps extends Omit<ImageProps, 'width' | 'height' | 'src'> {
  placeholderClassName?: string;
  width: number;
  height: number;
  src?: ImageProps['src'];
}

export default function NextServerImage({
  className,
  placeholderClassName,
  src,
  alt,
  width,
  height,
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
    <div className={`overflow-hidden ${className}`}>
      <Image
        {...restImageProps}
        className="image-cover"
        src={src}
        alt={alt}
        width={width * 2}
        height={height * 2}
        loading={priority ? 'eager' : loading}
        priority={priority}
      />
    </div>
  );
}
