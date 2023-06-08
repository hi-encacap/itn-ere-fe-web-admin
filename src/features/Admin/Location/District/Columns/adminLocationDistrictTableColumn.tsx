import { ILocationDistrict } from "@encacap-group/common/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { TFunction } from "i18next";

import { ColumnDef, TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";
import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";

import AdminLocationDistrictTableRowActions from "../Components/AdminLocationDistrictTableRowActions";

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
}

const createLocationDistrictTableColumns = (t: TFunction, { onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<ILocationDistrict>();

  const tableExampleColumns: Array<ColumnDef<ILocationDistrict>> = [
    columnHelper.accessor((row) => row.code, {
      id: "code",
      header: String(t("table.column.code")),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: String(t("table.column.name")),
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
        getFilterOptions: adminLocationService.getAllDistricts,
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <AdminLocationDistrictTableRowActions code={props.row.original.code} onClickDelete={onClickDelete} />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={1} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createLocationDistrictTableColumns;
