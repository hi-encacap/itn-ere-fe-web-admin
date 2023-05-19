import { createColumnHelper } from "@tanstack/react-table";
import { TFunction } from "i18next";

import { LocationAddressBookDataType } from "@interfaces/Admin/locationTypes";
import { ColumnDef, TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";

import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";

import AdminLocationAddressBookTableRowActions from "../Components/AdminLocationAddressBookTableRowActions";

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
}

const createLocationAddressBookTableColumns = (t: TFunction, { onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<LocationAddressBookDataType>();

  const tableExampleColumns: Array<ColumnDef<LocationAddressBookDataType>> = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      header: String(t("table.column.id")),
    }),
    columnHelper.accessor((row) => row.address, {
      id: "address",
      header: String(t("table.column.address")),
    }),
    columnHelper.accessor((row) => row.ward.name, {
      id: "wardName",
      header: String(t("table.column.wardName")),
      meta: {
        filterBy: "wardCodes",
        filterValueBy: "ward.code",
        filterLabelBy: "ward.name",
        filterLabel: String(t("table.column.wardName")),
        filterSearchBy: "wardName",
        getFilterOptions: adminLocationService.getAllAddressBooks,
      },
    }),
    columnHelper.accessor((row) => row.district.name, {
      id: "districtName",
      header: String(t("table.column.districtName")),
      meta: {
        filterBy: "districtCodes",
        filterValueBy: "district.code",
        filterLabelBy: "district.name",
        filterLabel: String(t("table.column.districtName")),
        filterSearchBy: "districtName",
        getFilterOptions: adminLocationService.getAllAddressBooks,
      },
    }),
    columnHelper.accessor((row) => row.province.name, {
      id: "provinceName",
      header: String(t("table.column.provinceName")),
      meta: {
        filterBy: "provinceCodes",
        filterValueBy: "province.code",
        filterLabelBy: "province.name",
        filterLabel: String(t("table.column.provinceName")),
        filterSearchBy: "provinceName",
        getFilterOptions: adminLocationService.getAllAddressBooks,
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <AdminLocationAddressBookTableRowActions id={props.row.original.id} onClickDelete={onClickDelete} />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={1} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createLocationAddressBookTableColumns;
