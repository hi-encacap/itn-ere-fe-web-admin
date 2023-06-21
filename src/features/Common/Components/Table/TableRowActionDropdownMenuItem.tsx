import { Key, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { TableRowActionDropdownItemType } from "@interfaces/Common/elementTypes";

interface TableRowActionDropdownMenuItemProps extends TableRowActionDropdownItemType {
  id: Key;
}

const TableRowActionDropdownMenuItem = ({
  className,
  icon,
  id,
  label,
  onClick,
}: TableRowActionDropdownMenuItemProps) => {
  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [id, onClick]);

  return (
    <div
      className={twMerge("flex items-center justify-start py-1.5 px-4 hover:bg-gray-100", className)}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="mr-3">{icon}</div>
      <div className="break-all line-clamp-1">{label}</div>
    </div>
  );
};

export default TableRowActionDropdownMenuItem;
