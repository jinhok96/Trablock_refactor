import { ImagePlaceholderProps } from '@/components/common/images/types';

export default function ImagePlaceholder({ className, animate }: ImagePlaceholderProps) {
  return (
    <div className={`size-full bg-gray-02 ${animate && 'animate-[pulse_1.5s_ease-in-out_infinite]'} ${className}`} />
  );
}
