import { usePatchDeleteArticle } from '@/apis/services/article/writer/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import SubmitModal from '@/components/modals/SubmitModal';
import useContextModal from '@/libs/hooks/useContextModal';
import useToast from '@/libs/hooks/useToast';

type DeletePlanModalProps = {
  articleId: number;
  onAfterDeletePlan?: () => void;
};

export default function DeletePlanModal({ articleId, onAfterDeletePlan }: DeletePlanModalProps) {
  const { showToast } = useToast();
  const { closeModal } = useContextModal();
  const { mutate, isPending } = usePatchDeleteArticle(articleId);

  const handleDeletePlan = () => {
    mutate(void 0, {
      onSuccess: (res) => {
        const { data, error } = res.body;
        if (!data || error) {
          const message = translateErrorCode(error?.code);
          return showToast(message, 'error');
        }
        closeModal();
        showToast('여행 계획 삭제 성공!', 'success');
        onAfterDeletePlan?.();
      }
    });
  };

  return (
    <SubmitModal
      className="!max-w-80 md:!max-w-96"
      submitText="삭제하기"
      negative
      onCancel={() => closeModal()}
      onSubmit={() => handleDeletePlan()}
      isLoading={isPending}
    >
      여행 계획을 삭제하시겠습니까?
    </SubmitModal>
  );
}
