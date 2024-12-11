import { useState } from 'react';

import { GetArticleResponse } from '@/apis/services/article/reader/type';
import { ScheduleDetail } from '@/apis/types/common';
import PlanDetailContentCoverImage, {
  PlanDetailContentCoverImageProps
} from '@/app/(fullscreen)/plans/[articleId]/_components/PlanDetailContentCoverImage';
import PlanDetailContentHeaderContent from '@/app/(fullscreen)/plans/[articleId]/_components/PlanDetailContentHeaderContent';
import ArrowButton from '@/components/common/buttons/ArrowButton';
import { COLORS } from '@/libs/constants/colors';

interface PlanDetailContentHeaderProps extends PlanDetailContentCoverImageProps {
  articleId: number;
  planDetail: GetArticleResponse;
  scheduleDetail: ScheduleDetail;
  isEditMode: boolean;
  handleSetEditMode: () => void;
}

export default function PlanDetailContentHeader({
  articleId,
  planDetail,
  scheduleDetail,
  isEditMode,
  handleSetEditMode,
  handleChangeCoverImage,
  src,
  isLoading
}: PlanDetailContentHeaderProps) {
  const [isCoverImageHidden, setIsCoverImageHidden] = useState(false);

  const handleToggleCoverImageHidden = () => {
    setIsCoverImageHidden((prev) => !prev);
  };

  return (
    <>
      <PlanDetailContentCoverImage
        className={`transition-[height] ${isCoverImageHidden && '!h-0'}`}
        handleChangeCoverImage={handleChangeCoverImage}
        src={src}
        isLoading={isLoading}
        isEditMode={isEditMode}
      />
      <div className="relative">
        <PlanDetailContentHeaderContent
          articleId={articleId}
          planDetail={planDetail}
          scheduleDetail={scheduleDetail}
          isEditMode={isEditMode}
          handleSetEditMode={handleSetEditMode}
        />
        <div className="absolute left-1/2 top-0.5 size-5 -translate-x-1/2 md:top-1 md:size-6">
          <ArrowButton
            direction={isCoverImageHidden ? 'DOWN' : 'UP'}
            color={COLORS.GRAY_01}
            width="100%"
            height="100%"
            onClick={handleToggleCoverImageHidden}
          />
        </div>
      </div>
    </>
  );
}
