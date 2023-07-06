import { omit } from "lodash";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { TableRowActionDropdownItemType } from "@interfaces/Common/elementTypes";

import TableRowActionDropdownMenuItem from "./TableRowActionDropdownMenuItem";

export interface TableRowActionDropdownMenuProps {
  id: string | number;
  items: TableRowActionDropdownItemType[];
  parentRef: RefObject<HTMLDivElement>;
}

const TableRowActionDropdownMenu = ({ id, items, parentRef }: TableRowActionDropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownContainer = window.document.querySelector(".encacap-dropdown-container");

  const setDropdownPosition = useCallback(() => {
    const parentElement = parentRef.current;
    const menuElement = menuRef.current;
    if (!parentElement || !menuElement) return;
    const parentElementRect = parentElement.getBoundingClientRect();
    menuElement.style.top = `${parentElementRect.top + parentElementRect.height + 8}px`;
    menuElement.style.right = `${window.innerWidth - parentElementRect.right - 16}px`;
  }, [parentRef]);

  useEffect(() => {
    setDropdownPosition();

    window.addEventListener("scroll", setDropdownPosition);
    window.addEventListener("resize", setDropdownPosition);

    return () => {
      window.removeEventListener("scroll", setDropdownPosition);
      window.removeEventListener("resize", setDropdownPosition);
    };
  }, [setDropdownPosition]);

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-10 flex max-w-xs flex-col rounded-lg border-2 border-gray-100 bg-white py-3 text-slate-700 shadow-lg shadow-gray-100"
    >
      {items.map((item) => (
        <TableRowActionDropdownMenuItem key={item.key} id={id} {...omit(item, "key")} />
      ))}
    </div>,
    dropdownContainer as Element,
  );
};

export default TableRowActionDropdownMenu;
