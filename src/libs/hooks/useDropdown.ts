import React, { useEffect, useRef, useState } from 'react';

interface useDropdownParams {
  onClickInside?: (e?: MouseEvent) => void;
  onClickOutside?: (e?: MouseEvent) => void;
}

const useDropdown = <T extends HTMLElement>({ onClickInside, onClickOutside }: useDropdownParams) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const ref = useRef<T>(null);

  const handleDropdownOpen = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setIsDropdownOpened(true);
  };

  const handleDropdownClose = (e?: MouseEvent) => {
    e?.stopPropagation();
    setIsDropdownOpened(false);
  };

  const handleDropdownToggle = (e?: MouseEvent) => {
    e?.stopPropagation();
    setIsDropdownOpened((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      if (ref.current.contains(e.target as Node) && onClickInside) {
        onClickInside(e);
        return;
      }

      onClickOutside?.(e);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, onClickInside, onClickOutside]);

  return { ref, isDropdownOpened, handleDropdownOpen, handleDropdownClose, handleDropdownToggle };
};

export default useDropdown;
