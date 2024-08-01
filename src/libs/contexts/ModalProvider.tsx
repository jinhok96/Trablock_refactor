'use client';

import React, { useMemo, useState } from 'react';

import ModalLoader from '@/components/modals/ModalLoader';
import { OpenedModalType } from '@/components/modals/type';
import { ModalDispatchContext, ModalStateContext } from '@/contexts/modalContext';

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  // 열려있는 모달 저장
  const [openedModal, setOpenedModal] = useState<OpenedModalType>(null);

  // 모달 열기
  const open = (modal: OpenedModalType) => {
    if (!modal) return null;
    if (openedModal) return null;

    return setOpenedModal(modal);
  };

  // 모달 닫기
  const close = () => {
    setOpenedModal(null);
  };

  // useMemo: {open, close} 객체 저장
  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalStateContext.Provider value={openedModal}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {openedModal && <ModalLoader />}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
