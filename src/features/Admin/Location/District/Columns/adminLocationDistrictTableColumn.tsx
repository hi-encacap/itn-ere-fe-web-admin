import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';

import { LocationDistrictWebsiteDataType } from '@interfaces/Admin/locationTypes';
import { ColumnDef, TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';

import TableRowActionSkeleton from '@components/Table/TableRowActionSkeleton';

import AdminLocationDistrictTableRowActions from '../Components/AdminLocationDistrictTableRowActions';

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
}

const createLocationDistrictTableColumns = (t: TFunction, { onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<LocationDistrictWebsiteDataType>();

  const tableExampleColumns: Array<ColumnDef<LocationDistrictWebsiteDataType>> = [
    columnHelper.accessor((row) => row.districtCode, {
      id: 'code',
      header: String(t('table.column.code')),
    }),
    columnHelper.accessor((row) => row.district.name, {
      id: 'name',
      header: String(t('table.column.name')),
    }),
    columnHelper.accessor((row) => row.district.province.name, {
      id: 'provinceName',
      header: String(t('table.column.provinceName')),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (props) => (
        <AdminLocationDistrictTableRowActions
          code={props.row.original.districtCode}
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

export default createLocationDistrictTableColumns;
