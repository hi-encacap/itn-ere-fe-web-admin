import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { IPost } from "@encacap-group/common/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { debounce, isEqual, omit } from "lodash";
import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ConfirmationModal } from "@components/Modal";
import { PostDeleteConfirmationModal, PostTableBody } from "@components/Post";
import { PostTableBodyItemProps } from "@components/Post/Table/TableBodyItem";
import Table from "@components/Table/Table";
import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import useToast from "@hooks/useToast";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { ColumnDef, TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminCategoryService, adminEstateService, adminPostService } from "@services/index";
import { generateColumnFilterObject } from "@utils/helpers";

import { EstateListTabEnum } from "@admin/Estate/Constants/enums";

export interface AdminPostListTableProps extends Pick<PostTableBodyItemProps, "mode"> {
  data: IPost[];
  isLoading: boolean;
  totalRows: number;
  defaultSelection?: string[];
  onChangeQueryParams: (queryParams: IBaseListQuery) => void;
  onMoveToTop: (id: Key) => Promise<void>;
  onPublish: (id: Key) => Promise<void>;
  onUnPublish: (id: Key) => Promise<void>;
  onChangeSelection?: (selected: string[]) => void;
}

const AdminPostListTable = ({
  data,
  defaultSelection,
  isLoading,
  mode,
  totalRows,
  onChangeQueryParams,
  onUnPublish,
  onPublish,
  onMoveToTop,
  onChangeSelection,
}: AdminPostListTableProps) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [queryParams, setQueryParams] = useState<IBaseListQuery>({
    ...pagination,
  });
  const [isShowUnPublishConfirmModal, setIsShowUnPublishConfirmModal] = useState(false);
  const [isShowPublishConfirmModal, setIsShowPublishConfirmModal] = useState(false);
  const [isShowDeleteConfirmModal, setIsShowDeleteConfirmModal] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState<Key | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const { tabId = EstateListTabEnum.COMPLETED, categoryId } = useParams();

  const selectedEstate = useMemo(
    () => data.find((estate) => estate.id === selectedEstateId) ?? null,
    [data, selectedEstateId],
  );

  const columnHelper = useMemo(() => createColumnHelper<IPost>(), []);

  const columns: Array<ColumnDef<IPost>> = useMemo(
    () => [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore: due to react-hook-form issue with self-ref interface.
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [
    handleChangeQueryParamsDebounced,
    handleCloseModal,
    onUnPublish,
    queryParams,
    selectedEstateId,
    t,
    toast,
  ]);

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
  }, [
    handleChangeQueryParamsDebounced,
    handleCloseModal,
    onPublish,
    queryParams,
    selectedEstateId,
    t,
    toast,
  ]);

  const handleSelectRow = useCallback(
    (rowId: Key) => {
      setSelectedRowIds((prev) => {
        if (prev.includes(String(rowId))) {
          return prev.filter((id) => id !== String(rowId));
        }

        return [String(rowId)];
      });
    },
    [setSelectedRowIds],
  );

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
  }, [handleChangeQueryParamsDebounced, queryParams]);

  useEffect(() => {
    if (!defaultSelection?.length || selectedRowIds.length > 0) {
      return;
    }

    setSelectedRowIds(defaultSelection.map((item) => String(item)));
  }, [defaultSelection, selectedRowIds.length]);

  useEffect(() => {
    onChangeSelection?.(selectedRowIds);
  }, [onChangeSelection, selectedRowIds]);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        pagination={{
          ...pagination,
          totalRows,
        }}
        onChangePagination={setPagination}
        onChangeFilters={setColumnFilters}
      >
        <PostTableBody
          isLoading={isLoading}
          mode={mode}
          onClickUnPublish={handleClickUnPublish}
          onClickPublish={handleClickPublish}
          onMoveToTop={onMoveToTop}
          onInteraction={handleInteraction}
          onClickDelete={handleClickDelete}
          rowSelection={selectedRowIds}
          onSelectRow={handleSelectRow}
        />
      </Table>
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

export default memo(AdminPostListTable);
