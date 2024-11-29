import { useContext, useEffect, useRef } from 'react';

import { DropdownDispatchContext, DropdownStateContext } from '@/contexts/DropdownContext';

function isContained(target: HTMLElement | null, element: HTMLElement | null): boolean {
  if (!target) return false;
  if (!element) return false;
  const targetOuterHTML = target.outerHTML;
  const elementOuterHTML = element.outerHTML;
  if (elementOuterHTML.includes(targetOuterHTML)) return true;
  return false;
}

export default function useContextDropdown<T extends HTMLElement>(id: string) {
  const containerRef = useRef<T>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const openedDropdownId = useContext(DropdownStateContext);
  const { open, close } = useContext(DropdownDispatchContext);

  const toggleDropdown = (dropdownId: string) => {
    if (openedDropdownId === dropdownId) return close();
    open(dropdownId);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openedDropdownId !== id) return;
      if (!openedDropdownId) return;
      if (!containerRef.current) return;
      if (!dropdownRef.current) return;

      const target = e.target as HTMLElement;
      if (isContained(target, containerRef.current)) return;
      if (isContained(target, dropdownRef.current)) return;

      close();
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (openedDropdownId && e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openedDropdownId, id, containerRef.current, dropdownRef.current, close]);

  return { containerRef, dropdownRef, openedDropdownId, openDropdown: open, closeDropdown: close, toggleDropdown };
}
