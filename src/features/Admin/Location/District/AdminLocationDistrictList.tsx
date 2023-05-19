import { IBaseListQuery } from "@encacap-group/types/dist/base";
import { ILocationDistrict } from "@encacap-group/types/dist/re";
import { SortingState } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";

import Table from "@components/Table/Table";

import LayoutContent from "@common/Layout/Components/LayoutContent";

import { generateColumnFilterObject, setDocumentTitle } from "@utils/helpers";

import createLocationDistrictTableColumns from "./Columns/adminLocationDistrictTableColumn";
import AdminLocationDistrictDeleteConfirmationModal from "./Components/AdminLocationDistrictDeleteConfirmationModal";
import AdminLocationDistrictHeaderAction from "./Components/AdminLocationDistrictHeaderAction";
import AdminLocationDistrictModificationModal from "./Components/AdminLocationDistrictModificationModal";

const AdminLocationDistrictList = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.location.district",
  });

  const [districtData, setDistrictData] = useState<ILocationDistrict[]>([]);
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
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);

  const getDistrictData = useCallback(() => {
    setIsLoading(true);

    adminLocationService
      .getDistricts(queryParams)
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

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((code: Key) => {
    setSelectedDistrictCode(code as string);
    setIsShowDeleteConfirmationModal(true);
  }, []);

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setIsShowDeleteConfirmationModal(false);
  }, []);

  const handleCloseModificationModal = useCallback(() => {
    setIsShowModificationModal(false);
  }, []);

  useEffect(() => {
    getDistrictData();
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
      actions={<AdminLocationDistrictHeaderAction onClick={handleClickAddButton} />}
    >
      <Table
        data={districtData}
        columns={createLocationDistrictTableColumns(t, {
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
      <AdminLocationDistrictDeleteConfirmationModal
        isOpen={isShowDeleteConfirmationModal}
        code={selectedDistrictCode ?? ""}
        onClose={handleCloseDeleteConfirmationModal}
        onDeleted={getDistrictData}
      />
      <AdminLocationDistrictModificationModal
        isOpen={isShowModificationModal}
        onClose={handleCloseModificationModal}
        onCreated={getDistrictData}
      />
    </LayoutContent>
  );
};

export default AdminLocationDistrictList;
