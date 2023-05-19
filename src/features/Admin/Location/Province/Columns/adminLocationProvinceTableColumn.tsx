import { ILocationProvince } from "@encacap-group/types/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { TFunction } from "i18next";

import { ColumnDef, TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";

import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";

import AdminLocationProvinceTableRowActions from "../Components/AdminLocationProvinceTableRowActions";

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
}

const createLocationProvinceTableColumns = (t: TFunction, { onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<ILocationProvince>();

  const tableExampleColumns: Array<ColumnDef<ILocationProvince>> = [
    columnHelper.accessor((row) => row.code, {
      id: "code",
      header: String(t("table.column.code")),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: String(t("table.column.name")),
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <AdminLocationProvinceTableRowActions code={props.row.original.code} onClickDelete={onClickDelete} />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={1} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createLocationProvinceTableColumns;
