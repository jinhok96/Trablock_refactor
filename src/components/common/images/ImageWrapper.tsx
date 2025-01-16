import { ImageWrapperProps } from '@/components/common/images/types';

export default function ImageWrapper({ className, children }: ImageWrapperProps) {
  const widthFull = className?.includes('w-') || className?.includes('size-') ? '' : ' w-full';
  const heightFull = className?.includes('h-') || className?.includes('size-') ? '' : ' h-full';
  const fullSizeClassName = className + widthFull + heightFull;

  return <div className={`relative overflow-hidden ${fullSizeClassName}`}>{children}</div>;
}
