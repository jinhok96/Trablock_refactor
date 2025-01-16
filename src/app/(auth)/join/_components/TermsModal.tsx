import Button from '@/components/common/buttons/Button';
import PrivacyPolicy from '@/components/features/terms/PrivacyPolicy';
import TermsOfService from '@/components/features/terms/TermsOfService';
import Modal, { CustomModalProps } from '@/components/modals/Modal';
import useContextModal from '@/libs/hooks/useContextModal';

interface TermsModalProps extends CustomModalProps {
  onSubmit?: () => void;
}

export default function TermsModal({ onSubmit, ...props }: TermsModalProps) {
  const { closeModal } = useContextModal();

  const handleSubmitButtonClick = () => {
    onSubmit?.();
    closeModal();
  };

  return (
    <Modal {...props} onRequestClose={closeModal}>
      <div className="mb-6 mt-3 md:mt-0">
        <TermsOfService />
        <div className="mb-16" />
        <PrivacyPolicy />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex-row-center gap-3">
          <Button
            onClick={handleSubmitButtonClick}
            className={`font-btn-3 md:font-btn-2 btn-solid h-12 w-full gap-x-2.5 rounded-md`}
          >
            동의
          </Button>
        </div>
      </div>
    </Modal>
  );
}
