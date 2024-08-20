import ReactModal from 'react-modal';

import CloseSvg from '@/icons/x.svg';
import { ModalProps } from '@/libs/contexts/ModalContextProvider';

export default function Modal({ children, className, containerClassName, ...restModalProps }: ModalProps) {
  const modalRoot = document.querySelector<HTMLElement>('#modal-root') ?? document.body;

  const { onRequestClose } = restModalProps;

  return (
    <ReactModal
      {...restModalProps}
      className={`fixed-center relative size-full overflow-hidden rounded-[0.625rem] bg-white-01 shadow-modal ${className}`}
      overlayClassName="bg-overlay z-modal fixed-center size-full"
      isOpen
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      parentSelector={() => modalRoot}
      appElement={modalRoot}
    >
      <CloseSvg className="absolute right-5 top-5 z-50 size-5 cursor-pointer md:size-5" onClick={onRequestClose} />
      <div
        className={`scrollbar-custom size-full max-h-[100vh] overflow-auto max-md:scrollbar-hide ${containerClassName}`}
      >
        {children}
      </div>
    </ReactModal>
  );
}
