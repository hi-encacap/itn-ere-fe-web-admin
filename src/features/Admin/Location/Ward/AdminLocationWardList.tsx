import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { SortingState } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { LocationWardWebsiteDataType } from "@interfaces/Admin/locationTypes";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";
import Table from "@components/Table/Table";
import LayoutContent from "@common/Layout/Components/LayoutContent";
import { generateColumnFilterObject, setDocumentTitle } from "@utils/helpers";

import createLocationWardTableColumns from "./Columns/adminLocationWardTableColumn";
import AdminLocationWardDeleteConfirmationModal from "./Components/AdminLocationWardDeleteConfirmationModal";
import AdminLocationWardHeaderAction from "./Components/AdminLocationWardHeaderAction";
import AdminLocationWardModificationModal from "./Components/AdminLocationWardModificationModal";

const AdminLocationWardList = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.location.ward",
  });

  const [wardData, setWardData] = useState<LocationWardWebsiteDataType[]>([]);
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
  const [selectedWardCode, setSelectedWardCode] = useState<string | null>(null);
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);

  const getWardData = useCallback(() => {
    setIsLoading(true);

    adminLocationService
      .getWards(queryParams)
      .then(({ data, meta }) => {
        setWardData(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: meta.totalPages,
          totalRows: meta.totalRows,
        }));
      })
      .catch(() => {
        setWardData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((code: Key) => {
    setSelectedWardCode(code as string);
    setIsShowDeleteConfirmationModal(true);
  }, []);

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setIsShowDeleteConfirmationModal(false);
  }, []);

  const handleCloseModificationModal = useCallback(() => {
    setIsShowModificationModal(false);
  }, []);

  useEffect(() => {
    getWardData();
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
    <LayoutContent
      title={t("title")}
      action={<AdminLocationWardHeaderAction onClick={handleClickAddButton} />}
    >
      <Table
        data={wardData}
        columns={createLocationWardTableColumns(t, {
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
      <AdminLocationWardDeleteConfirmationModal
        isOpen={isShowDeleteConfirmationModal}
        code={selectedWardCode ?? ""}
        onClose={handleCloseDeleteConfirmationModal}
        onDeleted={getWardData}
      />
      <AdminLocationWardModificationModal
        isOpen={isShowModificationModal}
        onClose={handleCloseModificationModal}
        onCreated={getWardData}
      />
    </LayoutContent>
  );
};

export default AdminLocationWardList;
