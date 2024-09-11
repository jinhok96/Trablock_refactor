import { useCallback, useContext, useEffect, useRef } from 'react';

import { DropdownDispatchContext, DropdownStateContext } from '@/contexts/DropdownContext';

export default function useContextDropdown(id: string) {
  const containerRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);
  const openedDropdownId = useContext(DropdownStateContext);
  const { open, close } = useContext(DropdownDispatchContext);

  const openDropdown = useCallback(
    (dropdownId: string) => {
      open(dropdownId);
    },
    [open]
  );

  const closeDropdown = useCallback(() => {
    close();
  }, [close]);

  const toggleDropdown = useCallback(
    (dropdownId: string) => {
      if (openedDropdownId === dropdownId) return closeDropdown();
      openDropdown(dropdownId);
    },
    [openedDropdownId, openDropdown, closeDropdown]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openedDropdownId !== id) return;
      if (!openedDropdownId) return;
      if (!containerRef.current) return;
      if (!dropdownRef.current) return;
      if (containerRef.current.contains(e.target as Node)) return;
      if (dropdownRef.current.contains(e.target as Node)) return;
      closeDropdown();
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (openedDropdownId && e.key === 'Escape') {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openedDropdownId, closeDropdown]);
  return { containerRef, dropdownRef, openedDropdownId, openDropdown, closeDropdown, toggleDropdown };
}
