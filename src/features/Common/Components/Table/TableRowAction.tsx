import { Key } from "react";
import { twMerge } from "tailwind-merge";

import { TableRowActionClickHandlerType, TableRowActionStatusType } from "@interfaces/Common/elementTypes";

export interface TableRowActionProps {
  id: Key;
  children: React.ReactNode;
  status?: TableRowActionStatusType;
  onClick?: TableRowActionClickHandlerType;
}

const TableRowAction = ({ id, children, status = "normal", onClick }: TableRowActionProps) => {
  return (
    <div
      className={twMerge(
        "rounded-lg bg-gray-100 p-2 duration-100 hover:bg-gray-200",
        status === "danger" && "bg-red-50 text-red-500 hover:bg-red-100",
      )}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(id)}
    >
      {children}
    </div>
  );
};

export default TableRowAction;
