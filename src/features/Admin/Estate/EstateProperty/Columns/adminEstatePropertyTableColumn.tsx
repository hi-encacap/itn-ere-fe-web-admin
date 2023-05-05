import { IEstateProperty } from '@encacap-group/types/dist/re';
import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';

import { ColumnDef, TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';
import { adminEstatePropertyService } from '@services/index';

import TableRowActionSkeleton from '@components/Table/TableRowActionSkeleton';

import AdminEstatePropertyTableRowActions from '../Components/AdminEstatePropertyTableRowActions';

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
  onClickEdit: TableRowActionClickHandlerType;
}

const createEstatePropertyTableColumns = (t: TFunction, { onClickDelete, onClickEdit }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<IEstateProperty>();

  const tableExampleColumns: Array<ColumnDef<IEstateProperty>> = [
    columnHelper.accessor((row) => row.id, {
      id: 'id',
      header: String(t('table.column.id')),
    }),
    columnHelper.accessor((row) => row.name, {
      id: 'name',
      header: String(t('table.column.name')),
    }),
    columnHelper.accessor((row) => row.category.name, {
      id: 'categoryName',
      header: String(t('table.column.categoryName')),
      meta: {
        filterBy: 'categoryIds',
        filterValueBy: 'category.id',
        filterLabelBy: 'category.name',
        filterSearchBy: 'categoryName',
        getFilterOptions: adminEstatePropertyService.getAllEstateProperties,
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (props) => (
        <AdminEstatePropertyTableRowActions
          id={props.row.original.id}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={2} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createEstatePropertyTableColumns;
