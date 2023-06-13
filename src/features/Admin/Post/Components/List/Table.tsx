import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { IPost } from "@encacap-group/common/dist/re";
import { SortingState, createColumnHelper } from "@tanstack/react-table";
import { debounce, isEqual, omit } from "lodash";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ConfirmationModal } from "@components/Modal";
import { PostDeleteConfirmationModal, PostTableBody } from "@components/Post";
import Table from "@components/Table/Table";
import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import useToast from "@hooks/useToast";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { ColumnDef, TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminCategoryService, adminEstateService, adminPostService } from "@services/index";
import { generateColumnFilterObject } from "@utils/helpers";

import { ESTATE_LIST_TAB_ENUM } from "@admin/Estate/Constants/enums";

interface AdminPostListTableProps {
  data: IPost[];
  isLoading: boolean;
  totalRows: number;
  onChangeQueryParams: (queryParams: IBaseListQuery) => void;
  onMoveToTop: (id: Key) => Promise<void>;
  onPublish: (id: Key) => Promise<void>;
  onUnPublish: (id: Key) => Promise<void>;
}

const AdminPostListTable = ({
  data,
  totalRows,
  isLoading,
  onChangeQueryParams,
  onUnPublish,
  onPublish,
  onMoveToTop,
}: AdminPostListTableProps) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [queryParams, setQueryParams] = useState<IBaseListQuery>({
    ...pagination,
  });
  const [isShowUnPublishConfirmModal, setIsShowUnPublishConfirmModal] = useState(false);
  const [isShowPublishConfirmModal, setIsShowPublishConfirmModal] = useState(false);
  const [isShowDeleteConfirmModal, setIsShowDeleteConfirmModal] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState<Key | null>(null);

  const { tabId = ESTATE_LIST_TAB_ENUM.COMPLETED, categoryId } = useParams();

  const selectedEstate = useMemo(
    () => data.find((estate) => estate.id === selectedEstateId) ?? null,
    [data, selectedEstateId],
  );

  const columnHelper = useMemo(() => createColumnHelper<IPost>(), []);

  const columns: Array<ColumnDef<IPost>> = useMemo(
    () => [
      columnHelper.accessor((row) => row.status, {
        id: "status",
        header: String(t("status")),
        meta: {
          filterBy: "statuses",
          filterValueBy: "name",
          filterSearchBy: "name",
          getFilterOptions: adminEstateService.getEstateStatuses,
          filterLabelFormatter: (value) => t(value as string),
        },
      }),
      columnHelper.accessor((row) => row.category.name, {
        id: "category",
        header: String(t("category")),
        meta: {
          filterBy: "categoryIds",
          filterLabelBy: "name",
          filterValueBy: "id",
          filterSearchBy: "name",
          getFilterOptions: adminCategoryService.getAllCategories,
        },
      }),
    ],
    [columnHelper, t],
  );

  const handleChangeQueryParamsDebounced = useCallback(debounce(onChangeQueryParams, 500), [
    onChangeQueryParams,
  ]);

  const handleInteraction = useCallback(() => {
    handleChangeQueryParamsDebounced?.(queryParams);
  }, [handleChangeQueryParamsDebounced, queryParams]);

  const handleClickUnPublish = useCallback((id: Key) => {
    setIsShowUnPublishConfirmModal(true);
    setSelectedEstateId(id);
  }, []);

  const handleClickPublish = useCallback((id: Key) => {
    setIsShowPublishConfirmModal(true);
    setSelectedEstateId(id);
  }, []);

  const handleClickDelete = useCallback((id: Key) => {
    setIsShowDeleteConfirmModal(true);
    setSelectedEstateId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowUnPublishConfirmModal(false);
    setIsShowPublishConfirmModal(false);
    setIsShowDeleteConfirmModal(false);
    setSelectedEstateId(null);
  }, []);

  const handleConfirmUnPublish = useCallback(async () => {
    if (!selectedEstateId) {
      return;
    }

    try {
      await onUnPublish(selectedEstateId);
      toast.success(t("unPublishSuccess"));
      handleChangeQueryParamsDebounced?.(queryParams);
    } catch (error) {
      toast.error(t("unPublishError"));
    } finally {
      handleCloseModal();
    }
  }, [selectedEstateId, queryParams]);

  const handleConfirmPublish = useCallback(async () => {
    if (!selectedEstateId) {
      return;
    }

    try {
      await onPublish(selectedEstateId);
      toast.success(t("publishSuccess"));
      handleChangeQueryParamsDebounced?.(queryParams);
    } catch (error) {
      toast.error(t("publishError"));
    } finally {
      handleCloseModal();
    }
  }, [selectedEstateId, queryParams]);

  useEffect(() => {
    const newQueryParams: IBaseListQuery = {
      ...omit(queryParams, "categoryId"),
      ...generateColumnFilterObject(columnFilters),
      tab: tabId,
      ...(categoryId && { categoryId: Number(categoryId) }),
      page: pagination.page,
    };

    if (isEqual(newQueryParams, queryParams)) {
      return;
    }

    setQueryParams(newQueryParams);
  }, [columnFilters, pagination, queryParams, tabId, categoryId]);

  useEffect(() => {
    handleChangeQueryParamsDebounced?.(queryParams);
  }, [queryParams]);

  return (
    <>
      <Table
        data={data}
        columns={columns}
        pagination={{
          ...pagination,
          totalRows,
        }}
        sorting={columnSorting}
        isLoading={isLoading}
        tableBodyProps={{
          onClickUnPublish: handleClickUnPublish,
          onClickPublish: handleClickPublish,
          onMoveToTop,
          onInteraction: handleInteraction,
          onClickDelete: handleClickDelete,
        }}
        renderTableBody={PostTableBody}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
      <ConfirmationModal
        title={t("unPublishPost", {
          title: selectedEstate?.title,
        })}
        message={t("unPublishPostMessage")}
        isOpen={isShowUnPublishConfirmModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmUnPublish}
      />
      <ConfirmationModal
        title={t("publishPost", {
          title: selectedEstate?.title,
        })}
        message={t("publishPostMessage")}
        isOpen={isShowPublishConfirmModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmPublish}
      />
      <PostDeleteConfirmationModal
        data={selectedEstate}
        isOpen={isShowDeleteConfirmModal}
        onClose={handleCloseModal}
        onDelete={adminPostService.deletePostById}
        onDeleteDraft={adminPostService.deletePostDraftById}
        onSuccess={handleInteraction}
      />
    </>
  );
};

export default AdminPostListTable;
