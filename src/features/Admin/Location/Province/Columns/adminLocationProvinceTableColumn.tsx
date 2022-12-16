import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';

import { LocationProvinceWebsiteDataType } from '@interfaces/Admin/locationTypes';
import { ColumnDef, TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';

import TableRowActionSkeleton from '@components/Table/TableRowActionSkeleton';

import AdminLocationProvinceTableRowActions from '../Components/AdminLocationProvinceTableRowActions';

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
}

const createLocationProvinceTableColumns = (t: TFunction, { onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<LocationProvinceWebsiteDataType>();

  const tableExampleColumns: Array<ColumnDef<LocationProvinceWebsiteDataType>> = [
    columnHelper.accessor((row) => row.provinceCode, {
      id: 'code',
      header: String(t('table.column.code')),
    }),
    columnHelper.accessor((row) => row.province.name, {
      id: 'name',
      header: String(t('table.column.name')),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (props) => (
        <AdminLocationProvinceTableRowActions
          code={props.row.original.provinceCode}
          onClickDelete={onClickDelete}
        />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={1} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createLocationProvinceTableColumns;
