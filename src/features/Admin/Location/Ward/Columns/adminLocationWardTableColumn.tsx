import { ILocationWard } from "@encacap-group/common/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { TFunction } from "i18next";

import { ColumnDef, TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";

import AdminLocationWardTableRowActions from "../Components/AdminLocationWardTableRowActions";

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
}

const createLocationWardTableColumns = (t: TFunction, { onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<ILocationWard>();

  const tableExampleColumns: Array<ColumnDef<ILocationWard>> = [
    columnHelper.accessor((row) => row.code, {
      id: "code",
      header: String(t("table.column.code")),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: String(t("table.column.name")),
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
        getFilterOptions: adminLocationService.getAllWards,
      },
    }),
    columnHelper.accessor((row) => row.district.province.name, {
      id: "provinceName",
      header: String(t("table.column.provinceName")),
      meta: {
        filterBy: "provinceCodes",
        filterValueBy: "district.province.code",
        filterLabelBy: "district.province.name",
        filterLabel: String(t("table.column.provinceName")),
        filterSearchBy: "provinceName",
        getFilterOptions: adminLocationService.getAllWards,
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <AdminLocationWardTableRowActions code={props.row.original.code} onClickDelete={onClickDelete} />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={1} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createLocationWardTableColumns;
