import { SortingState } from '@tanstack/react-table';
import { Key, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoryDataType } from '@interfaces/Admin/categoryTypes';
import { TablePaginationType } from '@interfaces/Common/commonTypes';
import { TableColumnFiltersState } from '@interfaces/Common/elementTypes';

import Table from '@components/Table/Table';

import LayoutContent from '@common/Layout/Components/LayoutContent';

import { setDocumentTitle } from '@utils/helpers';

import createCategoryTableColumns from './Columns/adminCategoryTableColumn';
import AdminCategoryHeaderAction from './Components/AdminCategoryHeaderAction';

const AdminCategory = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.category',
  });

  const [categoryData] = useState<CategoryDataType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationType>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFiltersState>([]);
  const [isLoading] = useState(true);

  const handleClickEditButton = (code?: Key) => {
    console.log('Edit button clicked', code);
  };

  const handleClickDeleteButton = (code?: Key) => {
    console.log('Delete button clicked', code);
  };

  useLayoutEffect(() => {
    setDocumentTitle(t('title'));
  }, [t]);

  return (
    <LayoutContent title={t('title')} actions={<AdminCategoryHeaderAction />}>
      <Table
        data={categoryData}
        columns={createCategoryTableColumns({
          onClickEdit: handleClickEditButton,
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        columnFilters={columnFilters}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
    </LayoutContent>
  );
};

export default AdminCategory;
