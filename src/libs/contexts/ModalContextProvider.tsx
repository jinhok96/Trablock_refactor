'use client';

import { ComponentType, createContext, HTMLAttributes, ReactNode, useContext, useMemo, useState } from 'react';
import { Props } from 'react-modal';

export interface ModalProps
  extends Omit<
    Props,
    | 'className'
    | 'overlayClassName'
    | 'isOpen'
    | 'shouldCloseOnOverlayClick'
    | 'shouldCloseOnEsc'
    | 'parentSelector'
    | 'appElement'
  > {
  className?: string;
  containerClassName?: string;
}
export type ModalComponentType = ComponentType<ModalProps>;
type OpenModal = (modal: ModalComponentType) => void;
type CloseModal = () => void;
type ModalStateContextType = ModalComponentType | null;
type ModalDispatchContextType = { open: OpenModal; close: CloseModal };
type ModalProviderProps = HTMLAttributes<ReactNode>;

// Context
export const ModalStateContext = createContext<ModalStateContextType>(null);
export const ModalDispatchContext = createContext<ModalDispatchContextType>({ open: () => {}, close: () => {} });

// Component
export function ModalLoader() {
  const OpenedModal = useContext<ModalStateContextType>(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  if (!OpenedModal) return null;

  const onRequestClose = () => {
    close();
  };

  return <OpenedModal onRequestClose={onRequestClose} />;
}

// Provider
export function ModalProvider({ children }: ModalProviderProps) {
  const [openedModal, setOpenedModal] = useState<ModalStateContextType>(null);

  const open: OpenModal = (modal: ModalComponentType) => {
    if (openedModal === modal) return null;
    setOpenedModal(modal);
  };

  const close: CloseModal = () => {
    setOpenedModal(null);
  };

  const dispatch = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalStateContext.Provider value={openedModal}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {openedModal && <ModalLoader />}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
