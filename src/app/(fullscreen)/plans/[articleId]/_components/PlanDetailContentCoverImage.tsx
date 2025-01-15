import { ChangeEventHandler } from 'react';

import NextImage from '@/components/common/images/NextImage';
import Loading from '@/components/common/Loading';
import { COLORS } from '@/libs/constants/colors';

export type PlanDetailContentCoverImageProps = {
  className?: string;
  isEditMode: boolean;
  handleChangeCoverImage: ChangeEventHandler<HTMLInputElement>;
  src: string;
  isLoading: boolean;
};

export default function PlanDetailContentCoverImage({
  className,
  isEditMode,
  handleChangeCoverImage,
  src,
  isLoading
}: PlanDetailContentCoverImageProps) {
  return (
    <div className={`relative h-[11.25rem] w-full overflow-hidden md:h-[15rem] 3xl:h-[20rem] ${className}`}>
      <div className={`${!isEditMode && 'hidden'}`}>
        <input
          id="cover-image-input"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleChangeCoverImage}
        />
        <label
          htmlFor="cover-image-input"
          className="font-caption-3 btn-ghost absolute right-5 top-32 cursor-pointer rounded-md px-3 py-2 text-center leading-none hover:bg-gray-02 md:right-7 md:top-[11.75rem] xl:right-10"
        >
          커버 이미지 변경
        </label>
      </div>
      <NextImage className="size-full" src={src} alt="cover" fill sizes="(max-width: 1280px) 100vw, 90vw" priority />
      <div className={`absolute left-0 top-0 size-full bg-overlay-light ${!isLoading && 'hidden'}`}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading color={COLORS.WHITE_01} width={32} height={32} visible={isLoading} />
        </div>
      </div>
    </div>
  );
}
