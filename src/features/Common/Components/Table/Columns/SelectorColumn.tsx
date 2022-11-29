import { createColumnHelper } from '@tanstack/react-table';

import TableSelectorColumn from '../TableSelectorColumn';
import TableSelectorColumnHeader from '../TableSelectorColumnHeader';
import TableSelectorColumnSkeleton from '../TableSelectorColumnSkeleton';

const columnHelper = createColumnHelper<Element>();

const selectorColumn = columnHelper.display({
  id: 'selector',
  header: ({ table }) => (
    <TableSelectorColumnHeader
      isSelectedAll={table.getIsAllRowsSelected()}
      isSelectedSome={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }) => (
    <TableSelectorColumn isSelected={row?.getIsSelected()} onToggle={row?.getToggleSelectedHandler()} />
  ),
  meta: {
    skeleton: <TableSelectorColumnSkeleton />,
  },
});

export { selectorColumn };
