import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { SortingState } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { LocationAddressBookDataType } from "@interfaces/Admin/locationTypes";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";
import Table from "@components/Table/Table";
import LayoutContent from "@common/Layout/Components/LayoutContent";
import { generateColumnFilterObject, setDocumentTitle } from "@utils/helpers";

import createLocationAddressBookTableColumns from "./Columns/adminLocationAddressBookTableColumn";
import AdminLocationAddressBookDeleteConfirmationModal from "./Components/AdminLocationAddressBookDeleteConfirmationModal";

const AdminLocationAddressBookList = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.location.addressBook",
  });

  const [districtData, setDistrictData] = useState<LocationAddressBookDataType[]>([]);
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
  const [selectedAddressBookId, setSelectedAddressBookId] = useState<number | null>(null);
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);

  const getAddressBookData = useCallback(() => {
    setIsLoading(true);

    adminLocationService
      .getAddressBooks(queryParams)
      .then(({ data, meta }) => {
        setDistrictData(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: meta.totalPages,
          totalRows: meta.totalRows,
        }));
      })
      .catch(() => {
        setDistrictData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleClickDeleteButton = useCallback((id: Key) => {
    setSelectedAddressBookId(id as number);
    setIsShowDeleteConfirmationModal(true);
  }, []);

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setIsShowDeleteConfirmationModal(false);
  }, []);

  useEffect(() => {
    getAddressBookData();
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
    <LayoutContent title={t("title")}>
      <Table
        data={districtData}
        columns={createLocationAddressBookTableColumns(t, {
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
      <AdminLocationAddressBookDeleteConfirmationModal
        isOpen={isShowDeleteConfirmationModal}
        id={selectedAddressBookId ?? 0}
        onClose={handleCloseDeleteConfirmationModal}
        onDeleted={getAddressBookData}
      />
    </LayoutContent>
  );
};

export default AdminLocationAddressBookList;
