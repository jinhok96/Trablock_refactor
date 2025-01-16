import { ImagePlaceholderProps } from '@/components/common/images/types';

export default function ImagePlaceholder({ className }: ImagePlaceholderProps) {
  return <div className={`size-full bg-gray-02 ${className}`} />;
}
