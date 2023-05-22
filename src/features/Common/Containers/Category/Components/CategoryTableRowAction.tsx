import { Key } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

import { TableRowActionClickHandlerType } from "../../../../../app/Types/Common/elementTypes";
import TableRowAction from "../../../Components/Table/TableRowAction";

interface CategoryTableRowActionProps {
  id: Key;
  onClickEdit: TableRowActionClickHandlerType;
  onClickDelete: TableRowActionClickHandlerType;
}

const CategoryTableRowAction = ({ id, onClickEdit, onClickDelete }: CategoryTableRowActionProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowAction id={id} onClick={onClickEdit}>
        <MdEdit />
      </TableRowAction>
      <TableRowAction id={id} status={"danger"} onClick={onClickDelete}>
        <FiTrash2 />
      </TableRowAction>
    </div>
  );
};

export default CategoryTableRowAction;
