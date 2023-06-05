import { DEFAULT_CLOUDFLARE_VARIANT_ENUM, ICategory, getImageURL } from "@encacap-group/common/dist/re";
import { userRoleSelector } from "@selectors/commonSliceSelectors";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ServiceGetAllFunctionType, TableOnclickFunctionType } from "@interfaces/Common/commonTypes";
import Table, { TableProps } from "@components/Table/Table";
import TableImageColumn from "@components/Table/TableImageColumn/TableImageColumn";
import useSelector from "@hooks/useSelector";

import CategoryTableRowAction from "./CategoryTableRowAction";

interface CategoryTableProps extends Omit<TableProps, "columns"> {
  data: ICategory[];
  onGetAll: ServiceGetAllFunctionType<ICategory>;
  onClickEdit: TableOnclickFunctionType;
  onClickDelete: TableOnclickFunctionType;
}

const CategoryTable = ({
  data,
  isLoading,
  sorting,
  pagination,
  onGetAll,
  onClickEdit,
  onClickDelete,
  onChangePagination,
  onChangeFilters,
  onChangeSorting,
}: CategoryTableProps) => {
  const { t } = useTranslation();
  const role = useSelector(userRoleSelector);

  const columnHelper = useMemo(() => createColumnHelper<ICategory>(), []);
  const categoryColumns: Array<ColumnDef<ICategory, string>> = [
    columnHelper.display({
      id: "thumbnail",
      cell: (props) => (
        <TableImageColumn
          src={getImageURL(props.row.original.thumbnail, DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL)}
        />
      ),
    }),
    columnHelper.accessor((row) => row.website.name, {
      id: "websiteDomain",
      header: String(t("website")),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.code, {
      id: "code",
      header: String(t("code")),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: String(t("name")),
    }),
    columnHelper.accessor((row) => row.categoryGroupCode as string, {
      id: "categoryGroupCode",
      header: String(t("categoryGroup")),
      cell: (info) => t(info.getValue()),
      meta: {
        filterBy: "categoryGroupCodes",
        filterValueBy: "categoryGroupCode",
        filterLabel: String(t("categoryGroup")),
        filterSearchBy: "categoryGroupName",
        filterLabelFormatter: (label) => t(String(label)),
        getFilterOptions: onGetAll,
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <CategoryTableRowAction
          id={props.row.original.id}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      ),
    }),
  ];

  return (
    <Table
      data={data}
      columns={categoryColumns as Array<ColumnDef<ICategory, unknown>>}
      pagination={pagination}
      hiddenColumns={[!role.isRoot && "websiteDomain"]}
      sorting={sorting}
      isLoading={isLoading}
      onChangePagination={onChangePagination}
      onChangeSorting={onChangeSorting}
      onChangeFilters={onChangeFilters}
    />
  );
};

export default CategoryTable;
