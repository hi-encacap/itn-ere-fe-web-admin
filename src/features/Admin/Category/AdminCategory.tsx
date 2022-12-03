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
import AdminCategoryDeleteConfirmationModal from './Components/AdminCategoryDeleteConfirmationModal';
import AdminCategoryHeaderAction from './Components/AdminCategoryHeaderAction';
import AdminCategoryModificationModal from './Components/AdminCategoryModificationModal';

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
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDataType | null>(null);

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

  const handleClickDeleteButton = useCallback(
    (code?: Key) => {
      const category = categoryData.find((item) => item.code === code);
      setSelectedCategory(category ?? null);
      setIsShowDeleteConfirmationModal(true);
    },
    [categoryData],
  );

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setIsShowDeleteConfirmationModal(false);
    setSelectedCategory(null);
  }, []);

  const handleConfirmDeleteCategory = useCallback(() => {
    if (!selectedCategory) {
      return;
    }

    adminCategoryService
      .deleteCategoryByCode(selectedCategory.code)
      .then(() => {
        getCategoryData();
      })
      .catch((error) => {
        // #skipcq: JS-0002
        console.log('Delete category failed', error);
      })
      .finally(() => {
        setIsShowDeleteConfirmationModal(false);
        setSelectedCategory(null);
      });
  }, [getCategoryData, selectedCategory]);

  const handleClickEditButton = useCallback(
    (code?: Key) => {
      setSelectedCategory(categoryData.find((item) => item.code === code) ?? null);
      setIsShowModificationModal(true);
    },
    [categoryData],
  );

  const handleClickAddButton = useCallback(() => {
    setSelectedCategory(null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModificationModal = useCallback(() => {
    setIsShowModificationModal(false);
    setSelectedCategory(null);
  }, []);

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
    <LayoutContent title={t('title')} actions={<AdminCategoryHeaderAction onClick={handleClickAddButton} />}>
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
      <AdminCategoryDeleteConfirmationModal
        isOpen={isShowDeleteConfirmationModal}
        onClose={handleCloseDeleteConfirmationModal}
        onConfirm={handleConfirmDeleteCategory}
        categoryCode={selectedCategory?.code}
      />
      <AdminCategoryModificationModal
        isOpen={isShowModificationModal}
        category={selectedCategory}
        onClose={handleCloseModificationModal}
      />
    </LayoutContent>
  );
};

export default AdminCategory;
