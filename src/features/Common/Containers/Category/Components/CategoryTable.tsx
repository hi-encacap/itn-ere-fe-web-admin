import { ICategory, IMAGE_VARIANT_ENUM, getImageURL } from "@encacap-group/common/dist/re";
import { userRoleSelector } from "@selectors/commonSliceSelectors";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import CategorySelectorName from "@components/Form/Select/CategorySelector/CategorySelectorName";
import Table, { TableProps } from "@components/Table/Table";
import TableImageColumn from "@components/Table/TableImageColumn/TableImageColumn";
import useSelector from "@hooks/useSelector";
import { ServiceGetAllFunctionType, TableOnclickFunctionType } from "@interfaces/Common/commonTypes";

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
      id: "avatar",
      cell: (props) => (
        <TableImageColumn src={getImageURL(props.row.original.avatar, IMAGE_VARIANT_ENUM.SMALL)} />
      ),
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
      cell: (info) => <CategorySelectorName data={info.row.original} />,
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

export default memo(CategoryTable);
