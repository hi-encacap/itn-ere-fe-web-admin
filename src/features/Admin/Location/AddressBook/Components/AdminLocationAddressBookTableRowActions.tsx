import { Key } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';

import TableRowAction from '@components/Table/TableRowAction';

interface AdminLocationAddressBookTableRowActionsProps {
  id: Key;
  onClickDelete: TableRowActionClickHandlerType<Key>;
}

const AdminLocationAddressBookTableRowActions = ({
  id,
  onClickDelete,
}: AdminLocationAddressBookTableRowActionsProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowAction id={id} status="danger" onClick={onClickDelete}>
        <FiTrash2 />
      </TableRowAction>
    </div>
  );
};

export default AdminLocationAddressBookTableRowActions;
