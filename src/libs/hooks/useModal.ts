import { useContext } from 'react';

import { OpenedModalType } from '@/components/modals/type';
import { ModalDispatchContext } from '@/contexts/modalContext';

export default function useModal() {
  const { open, close } = useContext(ModalDispatchContext);

  // 모달 열기
  const openModal = (modal: OpenedModalType) => {
    open(modal);
  };

  // 모달 닫기
  const closeModal = () => {
    close();
  };

  return { openModal, closeModal };
}
