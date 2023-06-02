import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { IEstate, IPost } from "@encacap-group/common/dist/re";
import { SortingState, createColumnHelper } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { ColumnDef, TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminEstateService } from "@services/index";

import { ConfirmationModal } from "@components/Modal";
import PostTableBody from "@components/Post/Table/TableBody";
import Table from "@components/Table/Table";

import useToast from "@hooks/useToast";
import { generateColumnFilterObject } from "@utils/helpers";

import { ESTATE_LIST_TAB_ENUM } from "@admin/Estate/Constants/enums";

interface AdminPostListTableProps {
  data: IPost[];
  isLoading: boolean;
  totalRows: number;
  onChangeQueryParams?: (queryParams: IBaseListQuery) => void;
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
    tab: ESTATE_LIST_TAB_ENUM.COMPLETED,
  });
  const [isShowUnPublishConfirmModal, setIsShowUnPublishConfirmModal] = useState(false);
  const [isShowPublishConfirmModal, setIsShowPublishConfirmModal] = useState(false);
  const [, setIsShowDeleteConfirmModal] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState<Key | null>(null);
  const [searchParams] = useSearchParams();

  const selectedTabIdParam = useMemo(
    () => searchParams.get("tab_id") ?? ESTATE_LIST_TAB_ENUM.COMPLETED,
    [searchParams],
  );

  const selectedEstate = useMemo(
    () => data.find((estate) => estate.id === selectedEstateId) ?? null,
    [data, selectedEstateId],
  );

  const columnHelper = useMemo(() => createColumnHelper<IEstate>(), []);

  const columns: Array<ColumnDef<IEstate>> = useMemo(
    () => [
      columnHelper.accessor((row) => row.ward, {
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
    ],
    [columnHelper, t],
  );

  const handleInteraction = useCallback(() => {
    onChangeQueryParams?.(queryParams);
  }, [onChangeQueryParams, queryParams]);

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
      toast.success(t("notification.unPublished"));
      onChangeQueryParams?.(queryParams);
    } catch (error) {
      toast.error(t("notification.unPublishFailed"));
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
      toast.success(t("notification.published"));
      onChangeQueryParams?.(queryParams);
    } catch (error) {
      toast.error(t("notification.publishFailed"));
    } finally {
      handleCloseModal();
    }
  }, [selectedEstateId, queryParams]);

  useEffect(() => {
    const newQueryParams: IBaseListQuery = {
      ...queryParams,
      ...generateColumnFilterObject(columnFilters),
    };

    if (isEqual(newQueryParams, queryParams)) {
      return;
    }

    setQueryParams(newQueryParams);
  }, [columnFilters, pagination, queryParams]);

  useEffect(() => {
    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      tab: selectedTabIdParam,
      page: 1,
    }));
  }, [selectedTabIdParam]);

  useEffect(() => {
    onChangeQueryParams?.(queryParams);
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
    </>
  );
};

export default AdminPostListTable;
