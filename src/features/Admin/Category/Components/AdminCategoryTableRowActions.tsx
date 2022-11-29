import { Key } from 'react';
import { useTranslation } from 'react-i18next';
import { FiTrash2 } from 'react-icons/fi';
import { MdAutoAwesome, MdEdit } from 'react-icons/md';

import {
  TableRowActionClickHandlerType,
  TableRowActionDropdownItemType,
} from '../../../../app/Types/Common/elementTypes';
import TableRowAction from '../../../Common/Components/Table/TableRowAction';
import TableRowActionDropdown from '../../../Common/Components/Table/TableRowActionDropdown';

interface AdminCategoryTableRowActionsProps {
  id: Key;
  onClickEdit: TableRowActionClickHandlerType<Key>;
  onClickDelete: TableRowActionClickHandlerType<Key>;
}

const AdminCategoryTableRowActions = ({
  id,
  onClickEdit,
  onClickDelete,
}: AdminCategoryTableRowActionsProps) => {
  const { t } = useTranslation(['documentation'], {
    keyPrefix: 'pages.table.table.columns.actions',
  });

  const dropdownMenuItems: Array<TableRowActionDropdownItemType<Key>> = [
    {
      key: 'do-something',
      label: t('doSomething'),
      icon: <MdAutoAwesome size={16} />,
      onClick: onClickEdit,
    },
    {
      key: 'delete',
      label: t('delete'),
      icon: <FiTrash2 size={16} />,
      className: 'text-red-500',
      onClick: onClickDelete,
    },
  ];

  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowAction id={id} onClick={(id) => onClickEdit(String(id))}>
        <MdEdit />
      </TableRowAction>
      <TableRowActionDropdown id={id} items={dropdownMenuItems} />
    </div>
  );
};

export default AdminCategoryTableRowActions;
