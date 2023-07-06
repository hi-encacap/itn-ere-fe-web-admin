import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { ICategory } from "@encacap-group/common/dist/re";
import { SortingState } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import useToast from "@hooks/useToast";
import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import {
  ServiceDeleteFunctionType,
  ServiceGetAllFunctionType,
  ServiceGetManyFunctionType,
  TablePaginationType,
} from "@interfaces/Common/commonTypes";
import { TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { generateColumnFilterObject, setDocumentTitle } from "@utils/helpers";

import CategoryDeleteConfirmationModal from "./Components/CategoryDeleteConfirmationModal";
import CategoryHeaderAction from "./Components/CategoryHeaderAction";
import CategoryModificationModal, {
  CategoryModificationModalProps,
} from "./Components/CategoryModificationModal";
import CategoryTable from "./Components/CategoryTable";

interface CategoryProps extends Pick<CategoryModificationModalProps, "onUpdate" | "onCreate"> {
  onGetMany: ServiceGetManyFunctionType<ICategory>;
  onGetAll: ServiceGetAllFunctionType<ICategory>;
  onDelete: ServiceDeleteFunctionType;
}

const Category = ({ onGetMany, onCreate, onUpdate, onDelete, onGetAll }: CategoryProps) => {
  const { t } = useTranslation();
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<Key | null>(null);

  const selectedCategory = useMemo(
    () => categoryData.find((item) => item.id === selectedCategoryId) ?? null,
    [categoryData, selectedCategoryId],
  );

  const getCategoryData = useCallback(() => {
    setIsLoading(true);

    onGetMany(queryParams)
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
        toast.error(t("getError", { ns: "common" }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [onGetMany, queryParams, t, toast]);

  const handleClickDeleteButton = useCallback((id: Key) => {
    setSelectedCategoryId(id ?? null);
    setIsShowDeleteConfirmationModal(true);
  }, []);

  const handleClickEditButton = useCallback((code?: Key) => {
    setSelectedCategoryId(code ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickAddButton = useCallback(() => {
    setSelectedCategoryId(null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteConfirmationModal(false);
    setSelectedCategoryId(null);
  }, []);

  const handleUpdatedCategory = useCallback(() => {
    toast.success(t("editCategorySuccess"));
    handleCloseModal();
    getCategoryData();
  }, [getCategoryData, handleCloseModal, t, toast]);

  const handleCreatedCategory = useCallback(() => {
    toast.success(t("addCategorySuccess"));
    handleCloseModal();
    getCategoryData();
  }, [getCategoryData, handleCloseModal, toast, t]);

  const handleCreateCategory = useCallback(
    async (data: CategoryFormDataType) => {
      try {
        await onCreate(data);
        handleCreatedCategory();
      } catch (err) {
        toast.error(t("performActionError"));
      }
    },
    [handleCreatedCategory, onCreate, t, toast],
  );

  const handleUpdateCategory = useCallback(
    async (id: Key, data: CategoryFormDataType) => {
      try {
        await onUpdate(id, data);
        handleUpdatedCategory();
      } catch (err) {
        toast.error(t("performActionError"));
      }
    },
    [handleUpdatedCategory, onUpdate, t, toast],
  );

  const handleConfirmDeleteCategory = useCallback(async () => {
    setIsShowDeleteConfirmationModal(false);

    try {
      await onDelete(selectedCategoryId as Key);
      toast.success(t("deleteCategorySuccess"));
      getCategoryData();
    } catch (err) {
      toast.error(t("performActionError"));
    } finally {
      handleCloseModal();
    }
  }, [getCategoryData, handleCloseModal, onDelete, selectedCategoryId, t, toast]);

  useEffect(() => {
    getCategoryData();
  }, [getCategoryData]);

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
  }, [columnFilters, pagination.limit, pagination.page, queryParams]);

  useLayoutEffect(() => {
    setDocumentTitle(t("categoryManagement"));
  }, [t]);

  return (
    <LayoutContent
      title={t("categoryManagement")}
      action={<CategoryHeaderAction onClick={handleClickAddButton} />}
    >
      <CategoryTable
        data={categoryData}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
        onGetAll={onGetAll}
      />
      <CategoryDeleteConfirmationModal
        category={selectedCategory}
        isOpen={isShowDeleteConfirmationModal}
        onClose={handleCloseModal}
        onDelete={handleConfirmDeleteCategory}
      />
      <CategoryModificationModal
        isOpen={isShowModificationModal}
        category={selectedCategory}
        onClose={handleCloseModal}
        onCreate={handleCreateCategory}
        onUpdate={handleUpdateCategory}
        onGetAll={onGetAll}
      />
    </LayoutContent>
  );
};

export default Category;
