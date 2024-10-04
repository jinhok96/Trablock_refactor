import { ChangeEventHandler, useState } from 'react';

import { GetArticleResponse } from '@/apis/services/article/reader/type';
import { usePutArticleCoverImage } from '@/apis/services/article/writer/useService';
import { ScheduleDetail } from '@/apis/types/common';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import PlanDetailContentCoverImage from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/PlanDetailContentCoverImage';
import PlanDetailContentHeaderContent from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/PlanDetailContentHeaderContent';
import ArrowButton from '@/components/common/buttons/ArrowButton';
import { COLORS } from '@/libs/constants/colors';
import { EXTERNAL_URLS } from '@/libs/constants/externalUrls';
import useToast from '@/libs/hooks/useToast';

type PlanDetailContentHeaderProps = {
  articleId: number;
  planDetail: GetArticleResponse;
  scheduleDetail: ScheduleDetail;
  isEditMode: boolean;
  handleSetEditMode: () => void;
};

export default function PlanDetailContentHeader({
  articleId,
  planDetail,
  scheduleDetail,
  isEditMode,
  handleSetEditMode
}: PlanDetailContentHeaderProps) {
  const [coverImage, setCoverImage] = useState(
    planDetail.cover_img_url || EXTERNAL_URLS.PLAN_DETAIL_DEFAULT_COVER_IMAGE
  );
  const [isCoverImageHidden, setIsCoverImageHidden] = useState(false);
  const { mutate: putArticleCoverImage, isPending: isPutArticleCoverImageLoading } = usePutArticleCoverImage(articleId);
  const { showToast } = useToast();

  const handleToggleCoverImageHidden = () => {
    setIsCoverImageHidden((prev) => !prev);
  };

  // 커버 이미지 변경
  const handleChangeCoverImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]; // File
    if (!file) return;

    putArticleCoverImage(
      { file },
      {
        onSuccess: (res) => {
          const { data, error } = res.body;
          if (!data || error) {
            const message = translateErrorCode(error?.code);
            return showToast(message, 'error');
          }
          setCoverImage(data.cover_img_url);
        }
      }
    );
  };

  return (
    <>
      <PlanDetailContentCoverImage
        className={`transition-[height] ${isCoverImageHidden && '!h-0'}`}
        isEditMode={isEditMode}
        handleChangeCoverImage={handleChangeCoverImage}
        src={coverImage}
        isLoading={isPutArticleCoverImageLoading}
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
