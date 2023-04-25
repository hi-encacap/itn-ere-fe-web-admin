import { Key, useCallback, useEffect, useRef, useState } from 'react';
import { HiMenu } from 'react-icons/hi';

import { TableRowActionDropdownItemType } from '@interfaces/Common/elementTypes';

import TableRowActionDropdownMenu from './TableRowActionDropdownMenu';

export interface TableRowActionDropdownProps {
  id: Key;
  items: TableRowActionDropdownItemType[];
}

const TableRowActionDropdown = ({ id, items }: TableRowActionDropdownProps) => {
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const toggleButtonRef = useRef<HTMLDivElement>(null);

  const handleClickToggleButton = useCallback(() => {
    setIsShowDropdownMenu((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!toggleButtonRef.current) {
      return undefined;
    }
    const toggleButtonElement = toggleButtonRef.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleButtonElement.contains(event.target as Node)) {
        return;
      }
      setIsShowDropdownMenu(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [toggleButtonRef.current]);

  return (
    <div className="relative" ref={toggleButtonRef}>
      <div
        className="cursor-pointer rounded-lg bg-gray-100 p-2 duration-100 hover:bg-gray-200"
        role="button"
        tabIndex={0}
        onClick={handleClickToggleButton}
      >
        <HiMenu />
      </div>
      {isShowDropdownMenu && <TableRowActionDropdownMenu parentRef={toggleButtonRef} id={id} items={items} />}
    </div>
  );
};

export default TableRowActionDropdown;
