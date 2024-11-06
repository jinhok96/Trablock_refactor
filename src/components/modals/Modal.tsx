'use client';

import ReactModal from 'react-modal';

import CloseSvg from '@/icons/x.svg';
import { ModalProps } from '@/libs/contexts/ModalContext';
import useContextModal from '@/libs/hooks/useContextModal';

export interface CustomModalProps extends ModalProps {
  mobileFullscreen?: boolean;
  hideCloseButton?: boolean;
}

export default function Modal({
  children,
  className,
  containerClassName,
  mobileFullscreen,
  onRequestClose,
  hideCloseButton,
  ...restModalProps
}: CustomModalProps) {
  const { closeModal } = useContextModal();

  const modalRoot = document.querySelector<HTMLElement>('#modal-root') ?? document.body;

  return (
    <ReactModal
      {...restModalProps}
      className={`relative m-auto max-h-full w-full max-w-[36rem] rounded-xl bg-white-01 shadow-modal focus:outline-none ${mobileFullscreen && 'max-md:flex-col-center max-md:size-full max-md:max-w-full max-md:rounded-none'} ${className}`}
      overlayClassName={`bg-overlay z-modal size-full fixed top-0 left-0 md:p-10 flex flex-col ${!mobileFullscreen && 'p-5'}`}
      isOpen
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      parentSelector={() => modalRoot}
      appElement={modalRoot}
      ariaHideApp={false}
      onRequestClose={onRequestClose || closeModal}
    >
      <CloseSvg
        className={`absolute right-3 top-3 z-50 size-4 cursor-pointer md:right-4 md:top-4 md:size-5 ${hideCloseButton && 'hidden'}`}
        onClick={onRequestClose || closeModal}
      />
      <div
        className={`scrollbar max-h-full overflow-auto p-5 md:p-8 ${mobileFullscreen && 'flex w-full grow flex-col'} ${containerClassName}`}
      >
        {children}
      </div>
    </ReactModal>
  );
}
