import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { IContact } from "@encacap-group/common/dist/re";
import { RowSelectionState, SortingState } from "@tanstack/react-table";
import { isEqual, keys } from "lodash";
import { Key, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import Table from "@components/Table/Table";
import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { TableRowSelectionTypeEnum } from "@constants/enums";
import useToast from "@hooks/useToast";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminContactService } from "@services/index";
import { generateColumnFilterObject, setDocumentTitle } from "@utils/helpers";

import createContactTableColumns from "./Columns/adminContactTableColumn";
import AdminContactDeleteConfirmationModal from "./Components/AdminContactDeleteConfirmationModal";
import AdminContactHeaderAction from "./Components/AdminContactHeaderAction";
import AdminContactModificationModal from "./Components/AdminContactModificationModal";

interface AdminContactListProps {
  defaultSelection?: IContact[];
  isShowTableOnly?: boolean;
  onChangeSelection?: (contact: IContact[]) => void;
}

const AdminContactList = ({
  defaultSelection,
  isShowTableOnly = false,
  onChangeSelection,
}: AdminContactListProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.contact",
  });
  const toast = useToast();

  const [contactData, setContactData] = useState<IContact[]>([]);
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
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const getContactData = useCallback(() => {
    setIsLoading(true);

    adminContactService
      .getContacts(queryParams)
      .then(({ data, meta }) => {
        setContactData(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: meta.totalPages,
          totalRows: meta.totalRows,
        }));
      })
      .catch(() => {
        setContactData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleClickAddButton = useCallback(() => {
    setSelectedContact(null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback(
    (id: Key) => {
      setSelectedContact(contactData.find((item) => item.id === id) ?? null);
      setIsShowModificationModal(true);
    },
    [contactData],
  );

  const handleClickDeleteButton = useCallback(
    (id: Key) => {
      setSelectedContact(contactData.find((item) => item.id === id) ?? null);
      setIsShowDeleteConfirmationModal(true);
    },
    [contactData, setIsShowDeleteConfirmationModal],
  );

  const handleCloseModificationModal = useCallback(() => {
    setIsShowModificationModal(false);
    setSelectedContact(null);
  }, []);

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setIsShowDeleteConfirmationModal(false);
    setSelectedContact(null);
  }, []);

  const handleUpdatedContact = useCallback(() => {
    toast.success(t("notification.success"), t("notification.contactUpdated"));
    getContactData();
  }, [getContactData, t, toast]);

  const handleUpdateContactFailed = useCallback(() => {
    toast.error(t("notification.error"), t("notification.contactUpdateFailed"));
  }, [t, toast]);

  const handleCreatedContact = useCallback(() => {
    toast.success(t("notification.success"), t("notification.contactCreated"));
    getContactData();
  }, [getContactData, t, toast]);

  const handleCreateContactFailed = useCallback(() => {
    toast.error(t("notification.error"), t("notification.contactCreateFailed"));
  }, [t, toast]);

  const handleDeletedContact = useCallback(() => {
    toast.success(t("notification.success"), t("notification.contactDeleted"));
    getContactData();
  }, [getContactData, t, toast]);

  const handleDeleteContactFailed = useCallback(() => {
    toast.error(t("notification.error"), t("notification.contactDeleteFailed"));
  }, [t, toast]);

  useEffect(() => {
    getContactData();
  }, [getContactData]);

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

  useEffect(() => {
    onChangeSelection?.(contactData.filter((item) => rowSelection[item.id]));
  }, [contactData, onChangeSelection, rowSelection]);

  useEffect(() => {
    if (keys(rowSelection).length) {
      return;
    }

    const newSelection: RowSelectionState = {};

    defaultSelection?.forEach((item) => {
      newSelection[item.id] = true;
    });

    setRowSelection(newSelection);
  }, [defaultSelection, rowSelection]);

  useLayoutEffect(() => {
    setDocumentTitle(t("title"), !isShowTableOnly);
  }, [t, isShowTableOnly]);

  if (isShowTableOnly) {
    return (
      <Table
        columns={createContactTableColumns(t, {
          onClickEdit: handleClickEditButton,
          onClickDelete: handleClickDeleteButton,
        })}
        data={contactData}
        isLoading={isLoading}
        sorting={columnSorting}
        pagination={pagination}
        rowSelection={rowSelection}
        rowSelectionType={TableRowSelectionTypeEnum.SINGLE}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
        onChangeRowSelection={setRowSelection}
      />
    );
  }

  return (
    <LayoutContent title={t("title")} action={<AdminContactHeaderAction onClick={handleClickAddButton} />}>
      <Table
        data={contactData}
        columns={createContactTableColumns(t, {
          onClickEdit: handleClickEditButton,
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
        onChangeRowSelection={setRowSelection}
      />
      <AdminContactModificationModal
        isOpen={isShowModificationModal}
        contact={selectedContact}
        onClose={handleCloseModificationModal}
        onUpdated={handleUpdatedContact}
        onUpdateFailed={handleUpdateContactFailed}
        onCreated={handleCreatedContact}
        onCreateFailed={handleCreateContactFailed}
      />
      <AdminContactDeleteConfirmationModal
        isOpen={isShowDeleteConfirmationModal}
        contactId={selectedContact?.id}
        onClose={handleCloseDeleteConfirmationModal}
        onDeleted={handleDeletedContact}
        onDeleteFailed={handleDeleteContactFailed}
      />
    </LayoutContent>
  );
};

export default AdminContactList;
