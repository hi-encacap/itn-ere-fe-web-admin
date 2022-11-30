import { createColumnHelper } from '@tanstack/react-table';
import { TFunction } from 'i18next';

import { CategoryDataType } from '@interfaces/Admin/categoryTypes';
import { ColumnDef, TableRowActionClickHandlerType } from '@interfaces/Common/elementTypes';
import { adminCategoryService } from '@services/index';

import { getImageURL } from '@utils/helpers';

import AdminCategoryTableImageColumn from '../Components/AdminCategoryTableImageColumn';
import AdminCategoryTableImageColumnSkeleton from '../Components/AdminCategoryTableImageColumnSkeleton';
import AdminCategoryTableRowActions from '../Components/AdminCategoryTableRowActions';

interface OnClickHandlers {
  onClickEdit: TableRowActionClickHandlerType;
  onClickDelete: TableRowActionClickHandlerType;
}

const createCategoryTableColumns = (t: TFunction, { onClickEdit, onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<CategoryDataType>();

  const tableExampleColumns: Array<ColumnDef<CategoryDataType>> = [
    columnHelper.accessor((row) => row.thumbnail, {
      id: 'thumbnail',
      header: String(t('table.columns.thumbnail')),
      enableSorting: false,
      cell: (info) => <AdminCategoryTableImageColumn src={getImageURL(info.getValue())} />,
      meta: {
        skeleton: <AdminCategoryTableImageColumnSkeleton />,
      },
    }),
    columnHelper.accessor((row) => row.code, {
      id: 'code',
      header: String(t('table.columns.code')),
    }),
    columnHelper.accessor((row) => row.name, {
      id: 'name',
      header: String(t('table.columns.name')),
    }),
    columnHelper.accessor((row) => row.categoryGroupCode, {
      id: 'categoryGroupCode',
      header: String(t('table.columns.categoryGroupCode.title')),
      cell: (info) => t(`table.columns.categoryGroupCode.${String(info.getValue())}`),
      meta: {
        filterBy: 'categoryGroupCodes',
        filterKey: 'categoryGroupCode',
        filterLabel: String(t('table.columns.categoryGroupCode.title')),
        getFilterOptions: adminCategoryService.getAllCategories,
        filterLabelFormatter: (label) => t(`table.columns.categoryGroupCode.${String(label)}`),
      },
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
    }),
  ];

  return tableExampleColumns;
};

export default createCategoryTableColumns;
