import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';

import { LocationWardWebsiteDataType } from '@interfaces/Admin/locationTypes';
import { ColumnDef, TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';

import TableRowActionSkeleton from '@components/Table/TableRowActionSkeleton';

import AdminLocationWardTableRowActions from '../Components/AdminLocationWardTableRowActions';

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
}

const createLocationWardTableColumns = (t: TFunction, { onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<LocationWardWebsiteDataType>();

  const tableExampleColumns: Array<ColumnDef<LocationWardWebsiteDataType>> = [
    columnHelper.accessor((row) => row.wardCode, {
      id: 'code',
      header: String(t('table.column.code')),
    }),
    columnHelper.accessor((row) => row.ward.name, {
      id: 'name',
      header: String(t('table.column.name')),
    }),
    columnHelper.accessor((row) => row.ward.district.name, {
      id: 'districtName',
      header: String(t('table.column.districtName')),
      // meta: {
      //   filterBy: 'provinceCodes',
      //   filterValueBy: 'district.province.code',
      //   filterLabelBy: 'district.province.name',
      //   filterLabel: String(t('table.column.provinceName')),
      //   filterSearchBy: 'provinceName',
      //   getFilterOptions: adminLocationService.getAllDistricts,
      // },
    }),
    columnHelper.accessor((row) => row.ward.district.province.name, {
      id: 'provinceName',
      header: String(t('table.column.provinceName')),
      // meta: {
      //   filterBy: 'provinceCodes',
      //   filterValueBy: 'district.province.code',
      //   filterLabelBy: 'district.province.name',
      //   filterLabel: String(t('table.column.provinceName')),
      //   filterSearchBy: 'provinceName',
      //   getFilterOptions: adminLocationService.getAllDistricts,
      // },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (props) => (
        <AdminLocationWardTableRowActions code={props.row.original.wardCode} onClickDelete={onClickDelete} />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={1} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createLocationWardTableColumns;
