import { Key } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

import { TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";
import TableRowAction from "@components/Table/TableRowAction";

interface ComponentProps {
  id: Key;
  onClickDelete: TableRowActionClickHandlerType;
  onClickEdit: TableRowActionClickHandlerType;
}

const AdminEstatePropertyTableRowActions = ({ id, onClickDelete, onClickEdit }: ComponentProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowAction id={id} onClick={onClickEdit}>
        <MdEdit />
      </TableRowAction>
      <TableRowAction id={id} status="danger" onClick={onClickDelete}>
        <FiTrash2 />
      </TableRowAction>
    </div>
  );
};

export default AdminEstatePropertyTableRowActions;
