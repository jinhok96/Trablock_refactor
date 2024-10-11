import Button from '@/components/common/buttons/Button';
import Modal, { CustomModalProps } from '@/components/modals/Modal';

export interface SubmitModalProps extends CustomModalProps {
  submitText: string;
  negative?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export default function SubmitModal({
  children,
  onCancel,
  onSubmit,
  submitText,
  negative = false,
  ...props
}: SubmitModalProps) {
  const handleCancelButtonClick = () => {
    onCancel?.();
  };

  const handleSubmitButtonClick = () => {
    onSubmit?.();
  };

  return (
    <Modal {...props} onRequestClose={handleCancelButtonClick}>
      <div className="font-subtitle-2 md:font-title-4 mb-6 mt-3 text-center leading-normal md:mt-0">{children}</div>
      <div className="flex flex-col gap-10">
        <div className="flex-row-center gap-3">
          <Button
            onClick={handleCancelButtonClick}
            className="font-btn-3 md:font-btn-2 btn-outline h-12 w-full gap-x-2.5 rounded-md"
          >
            취소하기
          </Button>
          <Button
            onClick={handleSubmitButtonClick}
            className={`font-btn-3 md:font-btn-2 h-12 w-full gap-x-2.5 rounded-md ${negative ? 'btn-red' : 'btn-solid'}`}
          >
            {submitText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
