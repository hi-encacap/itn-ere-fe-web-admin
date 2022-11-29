import { createColumnHelper } from '@tanstack/react-table';

import { CategoryDataType } from '@interfaces/Admin/categoryTypes';
import { ColumnDef, TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';

import AdminCategoryTableImageColumn from '../Components/AdminCategoryTableImageColumn';
import AdminCategoryTableImageColumnSkeleton from '../Components/AdminCategoryTableImageColumnSkeleton';
import AdminCategoryTableRowActions from '../Components/AdminCategoryTableRowActions';

interface OnClickHandlers {
  onClickEdit: TableRowActionClickHandlerType;
  onClickDelete: TableRowActionClickHandlerType;
}

const createCategoryTableColumns = ({ onClickEdit, onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<CategoryDataType>();

  const tableExampleColumns: Array<ColumnDef<CategoryDataType>> = [
    columnHelper.accessor((row) => row.thumbnail, {
      id: 'thumbnail',
      header: 'Thumbnail',
      enableSorting: false,
      cell: (info) => <AdminCategoryTableImageColumn src={info.getValue()} alt={info.getValue()} />,
      meta: {
        skeleton: <AdminCategoryTableImageColumnSkeleton />,
      },
    }),
    columnHelper.accessor((row) => row.code, {
      id: 'code',
      header: 'Code',
      meta: {
        filterBy: 'code',
        filterLabel: 'Code',
        // getFilterOptions: DocumentationTableExampleService.getTableExampleData,
      },
    }),
    columnHelper.accessor((row) => row.name, {
      id: 'name',
      header: 'Name',
    }),
    columnHelper.accessor((row) => row.categoryGroupCode, {
      id: 'categoryGroupCode',
      header: 'Group',
      // meta: {
      //   filterBy: 'email',
      //   getFilterOptions: DocumentationTableExampleService.getTableExampleData,
      // },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (props) => (
        <AdminCategoryTableRowActions
          id={props.row.original.code}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      ),
      meta: {
        // skeleton: <TableExampleRowActionsSkeleton />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createCategoryTableColumns;
