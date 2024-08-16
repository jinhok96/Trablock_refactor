import { useContext } from 'react';

import { ModalDispatchContext } from '@/libs/contexts/ModalContextProvider';

export default function useContextModal() {
  const { open: openModal, close: closeModal } = useContext(ModalDispatchContext);
  return { openModal, closeModal };
}
