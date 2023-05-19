import { DEFAULT_CLOUDFLARE_VARIANT_ENUM, IContact, getImageURL } from "@encacap-group/types/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { TFunction } from "i18next";

import { ColumnDef, TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";

import TableImageColumn from "@components/Table/TableImageColumn/TableImageColumn";
import TableImageColumnSkeleton from "@components/Table/TableImageColumn/TableImageColumnSkeleton";

import AdminContactTableRowActions from "../Components/AdminContactTableRowActions";

interface OnClickHandlers {
  onClickEdit: TableRowActionClickHandlerType;
  onClickDelete: TableRowActionClickHandlerType;
}

const createContactTableColumns = (t: TFunction, { onClickEdit, onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<IContact>();

  const tableExampleColumns: Array<ColumnDef<IContact>> = [
    columnHelper.accessor((row) => row.avatar, {
      id: "avatar",
      header: String(t("table.column.avatar")),
      enableSorting: false,
      cell: (info) => (
        <TableImageColumn src={getImageURL(info.getValue(), DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL)} />
      ),
      meta: {
        skeleton: <TableImageColumnSkeleton />,
      },
    }),
    columnHelper.accessor((row) => row.id, {
      id: "id",
      header: String(t("table.column.id")),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: String(t("table.column.name")),
    }),
    columnHelper.accessor((row) => row.phone, {
      id: "phone",
      header: String(t("table.column.phone")),
    }),
    columnHelper.accessor((row) => row.zalo, {
      id: "zalo",
      header: String(t("table.column.zalo")),
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      header: String(t("table.column.email")),
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <AdminContactTableRowActions
          id={props.row.original.id}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      ),
    }),
  ];

  return tableExampleColumns;
};

export default createContactTableColumns;
