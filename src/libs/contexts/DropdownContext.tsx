'use client';

import { ReactNode, createContext, useMemo, useState } from 'react';

type OpenDropdown = (dropdownId: string) => void;
type CloseDropdown = () => void;
type DropdownStateContextType = string | null;
type DropdownDispatchContextType = { open: OpenDropdown; close: CloseDropdown };

export const DropdownStateContext = createContext<DropdownStateContextType>(null);
export const DropdownDispatchContext = createContext<DropdownDispatchContextType>({ open: () => {}, close: () => {} });

export function DropdownProvider({ children }: { children: ReactNode }) {
  const [openedDropdownId, setOpenedDropdownId] = useState<DropdownStateContextType>(null);

  const open: OpenDropdown = (dropdownId: string) => {
    if (openedDropdownId === dropdownId) return;
    setOpenedDropdownId(dropdownId);
  };

  const close: CloseDropdown = () => {
    if (openedDropdownId === null) return;
    setOpenedDropdownId(null);
  };

  const dispatch = useMemo(() => ({ open, close }), [open, close]);

  return (
    <DropdownStateContext.Provider value={openedDropdownId}>
      <DropdownDispatchContext.Provider value={dispatch}>{children}</DropdownDispatchContext.Provider>
    </DropdownStateContext.Provider>
  );
}
