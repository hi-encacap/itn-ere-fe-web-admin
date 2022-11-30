import { RefObject, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import { TableRowActionDropdownItemType } from '@interfaces/Common/elementTypes';

export interface TableRowActionDropdownMenuProps {
  id: string | number;
  items: TableRowActionDropdownItemType[];
  parentRef: RefObject<HTMLDivElement>;
}

const TableRowActionDropdownMenu = ({ id, items, parentRef }: TableRowActionDropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownContainer = window.document.querySelector('.encacap-dropdown-container');

  const setDropdownPosition = () => {
    const parentElement = parentRef.current;
    const menuElement = menuRef.current;
    if (!parentElement || !menuElement) return;
    const parentElementRect = parentElement.getBoundingClientRect();
    menuElement.style.top = `${parentElementRect.top + parentElementRect.height + 8}px`;
    menuElement.style.right = `${window.innerWidth - parentElementRect.right - 16}px`;
  };

  useEffect(() => {
    setDropdownPosition();

    window.addEventListener('scroll', setDropdownPosition);
    window.addEventListener('resize', setDropdownPosition);

    return () => {
      window.removeEventListener('scroll', setDropdownPosition);
      window.removeEventListener('resize', setDropdownPosition);
    };
  }, [parentRef.current]);

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-10 flex max-w-xs flex-col rounded-lg border-2 border-gray-100 bg-white py-3 text-slate-700 shadow-lg shadow-gray-100"
    >
      {items.map((item) => (
        <div
          key={item.key}
          className={twMerge('flex items-center justify-start py-1.5 px-4 hover:bg-gray-100', item.className)}
          role="button"
          tabIndex={0}
          onClick={() => item.onClick(id)}
        >
          <div className="mr-3">{item.icon}</div>
          <div className="break-all line-clamp-1">{item.label}</div>
        </div>
      ))}
    </div>,
    dropdownContainer as Element,
  );
};

export default TableRowActionDropdownMenu;
