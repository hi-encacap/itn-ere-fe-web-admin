import { DEFAULT_CLOUDFLARE_VARIANT_ENUM, ICategory, getImageURL } from "@encacap-group/types/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { TFunction } from "i18next";

import { ColumnDef, TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";
import { adminCategoryService } from "@services/index";

import TableImageColumn from "@components/Table/TableImageColumn/TableImageColumn";
import TableImageColumnSkeleton from "@components/Table/TableImageColumn/TableImageColumnSkeleton";

import AdminCategoryTableRowActions from "../Components/AdminCategoryTableRowActions";

interface OnClickHandlers {
  onClickEdit: TableRowActionClickHandlerType;
  onClickDelete: TableRowActionClickHandlerType;
}

const createCategoryTableColumns = (t: TFunction, { onClickEdit, onClickDelete }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<ICategory>();

  const tableExampleColumns: Array<ColumnDef<ICategory>> = [
    columnHelper.accessor((row) => row.thumbnail, {
      id: "thumbnail",
      header: String(t("table.columns.thumbnail")),
      enableSorting: false,
      cell: (info) => (
        <TableImageColumn src={getImageURL(info.getValue(), DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL)} />
      ),
      meta: {
        skeleton: <TableImageColumnSkeleton />,
      },
    }),
    columnHelper.accessor((row) => row.code, {
      id: "code",
      header: String(t("table.columns.code")),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: String(t("table.columns.name")),
    }),
    columnHelper.accessor((row) => row.categoryGroupCode, {
      id: "categoryGroupCode",
      header: String(t("table.columns.categoryGroupCode.title")),
      cell: (info) => t(`table.columns.categoryGroupCode.${String(info.getValue())}`),
      meta: {
        filterBy: "categoryGroupCodes",
        filterValueBy: "categoryGroupCode",
        filterLabel: String(t("table.columns.categoryGroupCode.title")),
        filterSearchBy: "categoryGroupName",
        getFilterOptions: adminCategoryService.getAllCategories,
        filterLabelFormatter: (label) => t(`table.columns.categoryGroupCode.${String(label)}`),
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <AdminCategoryTableRowActions
          id={props.row.original.code}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      ),
    }),
  ];

  return tableExampleColumns;
};

export default createCategoryTableColumns;
