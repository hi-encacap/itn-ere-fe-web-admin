import { SortingState } from '@tanstack/react-table';
import { isEqual } from 'lodash';
import { Key, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZE } from '@constants/defaultValues';
import { CategoryDataType } from '@interfaces/Admin/categoryTypes';
import { BaseQueryParamsType, TablePaginationType } from '@interfaces/Common/commonTypes';
import { TableColumnFilterState } from '@interfaces/Common/elementTypes';
import { adminCategoryService } from '@services/index';

import Table from '@components/Table/Table';

import LayoutContent from '@common/Layout/Components/LayoutContent';

import { generateColumnFilterObject, setDocumentTitle } from '@utils/helpers';

import createCategoryTableColumns from './Columns/adminCategoryTableColumn';
import AdminCategoryHeaderAction from './Components/AdminCategoryHeaderAction';

const AdminCategory = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.category',
  });

  const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState<BaseQueryParamsType>({
    ...pagination,
  });

  const handleClickEditButton = (code?: Key) => {
    // #skipcq: JS-0002
    console.log('Edit button clicked', code);
  };

  const handleClickDeleteButton = (code?: Key) => {
    // #skipcq: JS-0002
    console.log('Delete button clicked', code);
  };

  const getCategoryData = useCallback(() => {
    setIsLoading(true);

    adminCategoryService
      .getCategories(queryParams)
      .then(({ data, meta }) => {
        setCategoryData(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: meta.totalPages,
          totalRows: meta.totalRows,
        }));
      })
      .catch(() => {
        setCategoryData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  useEffect(() => {
    getCategoryData();
  }, [queryParams]);

  useEffect(() => {
    const newQueryParams: BaseQueryParamsType = {
      ...queryParams,
      ...generateColumnFilterObject(columnFilters),
      page: pagination.page,
      limit: pagination.limit,
    };

    if (isEqual(newQueryParams, queryParams)) {
      return;
    }

    setQueryParams(newQueryParams);
  }, [columnFilters, pagination]);

  useLayoutEffect(() => {
    setDocumentTitle(t('title'));
  }, [t]);

  return (
    <LayoutContent title={t('title')} actions={<AdminCategoryHeaderAction />}>
      <Table
        data={categoryData}
        columns={createCategoryTableColumns(t, {
          onClickEdit: handleClickEditButton,
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
    </LayoutContent>
  );
};

export default AdminCategory;
