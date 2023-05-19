import { IBaseListQuery } from "@encacap-group/types/dist/base";
import { ICategory } from "@encacap-group/types/dist/re";
import { SortingState } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminCategoryService } from "@services/index";

import Table from "@components/Table/Table";

import LayoutContent from "@common/Layout/Components/LayoutContent";

import useToast from "@hooks/useToast";
import { generateColumnFilterObject, setDocumentTitle } from "@utils/helpers";

import createCategoryTableColumns from "./Columns/adminCategoryTableColumn";
import AdminCategoryDeleteConfirmationModal from "./Components/AdminCategoryDeleteConfirmationModal";
import AdminCategoryHeaderAction from "./Components/AdminCategoryHeaderAction";
import AdminCategoryModificationModal from "./Components/AdminCategoryModificationModal";

const AdminCategory = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.category",
  });
  const toast = useToast();

  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState<IBaseListQuery>({
    ...pagination,
  });
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

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

  const handleDeletedCategory = useCallback(() => {
    toast.success(t("notification.success"), t("notification.categoryDeleted"));
    getCategoryData();
  }, [getCategoryData]);

  const handleDeleteCategoryFailed = useCallback(() => {
    toast.error(t("notification.error"), t("notification.categoryDeleteFailed"));
  }, []);

  const handleUpdatedCategory = useCallback(() => {
    toast.success(t("notification.success"), t("notification.categoryUpdated"));
    getCategoryData();
  }, [getCategoryData]);

  const handleUpdateCategoryFailed = useCallback(() => {
    toast.error(t("notification.error"), t("notification.categoryUpdateFailed"));
  }, []);

  const handleCreatedCategory = useCallback(() => {
    toast.success(t("notification.success"), t("notification.categoryCreated"));
    getCategoryData();
  }, [getCategoryData]);

  const handleCreateCategoryFailed = useCallback(() => {
    toast.error(t("notification.error"), t("notification.categoryCreateFailed"));
  }, []);

  useEffect(() => {
    getCategoryData();
  }, [queryParams]);

  useEffect(() => {
    const newQueryParams: IBaseListQuery = {
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
    setDocumentTitle(t("title"));
  }, [t]);

  return (
    <LayoutContent title={t("title")} actions={<AdminCategoryHeaderAction onClick={handleClickAddButton} />}>
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
        categoryId={selectedCategory?.id}
        isOpen={isShowDeleteConfirmationModal}
        onClose={handleCloseDeleteConfirmationModal}
        onDeleted={handleDeletedCategory}
        onDeleteFailed={handleDeleteCategoryFailed}
      />
      <AdminCategoryModificationModal
        isOpen={isShowModificationModal}
        category={selectedCategory}
        onClose={handleCloseModificationModal}
        onUpdated={handleUpdatedCategory}
        onUpdateFailed={handleUpdateCategoryFailed}
        onCreated={handleCreatedCategory}
        onCreateFailed={handleCreateCategoryFailed}
      />
    </LayoutContent>
  );
};

export default AdminCategory;
