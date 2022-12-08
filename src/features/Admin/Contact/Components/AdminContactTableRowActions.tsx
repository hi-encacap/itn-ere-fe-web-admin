import { Key } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';

import { TableRowActionClickHandlerType } from '../../../../app/Types/Common/elementTypes';
import TableRowAction from '../../../Common/Components/Table/TableRowAction';

interface AdminContactTableRowActionsProps {
  id: Key;
  onClickEdit: TableRowActionClickHandlerType<Key>;
  onClickDelete: TableRowActionClickHandlerType<Key>;
}

const AdminContactTableRowActions = ({
  id,
  onClickEdit,
  onClickDelete,
}: AdminContactTableRowActionsProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowAction id={id} onClick={onClickEdit}>
        <MdEdit />
      </TableRowAction>
      <TableRowAction id={id} status={'danger'} onClick={onClickDelete}>
        <FiTrash2 />
      </TableRowAction>
    </div>
  );
};

export default AdminContactTableRowActions;
