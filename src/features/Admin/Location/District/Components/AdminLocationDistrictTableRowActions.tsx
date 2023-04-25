import { Key } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';

import TableRowAction from '@components/Table/TableRowAction';

interface AdminProvinceDistrictTableRowActionsProps {
  code: Key;
  onClickDelete: TableRowActionClickHandlerType;
}

const AdminLocationDistrictTableRowActions = ({
  code,
  onClickDelete,
}: AdminProvinceDistrictTableRowActionsProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowAction id={code} status="danger" onClick={onClickDelete}>
        <FiTrash2 />
      </TableRowAction>
    </div>
  );
};

export default AdminLocationDistrictTableRowActions;
