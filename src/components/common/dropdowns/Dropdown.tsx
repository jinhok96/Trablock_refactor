import { forwardRef, HTMLAttributes } from 'react';

import useContextDropdown from '@/libs/hooks/useContextDropdown';

interface DropdownProps extends HTMLAttributes<HTMLUListElement> {
  id: string;
}

export default forwardRef<HTMLUListElement, DropdownProps>(function Dropdown(
  { id, className, children, ...ulProps }: DropdownProps,
  ref
) {
  const { openedDropdownId } = useContextDropdown(id);

  return (
    <ul
      {...ulProps}
      id={id}
      className={`border-1 font-body-2 scrollbar absolute left-0 z-10 mt-2 w-full overflow-auto rounded border-gray-02 bg-white-01 py-1.5 leading-snug shadow-dropdown transition-[opacity,visibility] ${className} ${openedDropdownId === id ? 'opacity-100' : 'invisible opacity-0'}`}
      ref={ref}
    >
      {children}
    </ul>
  );
});