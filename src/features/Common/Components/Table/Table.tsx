import {
  ColumnDef,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table as TableCore,
  useReactTable,
} from "@tanstack/react-table";
import { keys } from "lodash";
import { cloneElement, memo, ReactElement, useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { TableRowSelectionTypeEnum } from "@constants/enums";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import {
  TableColumnFilterState,
  TableDataType,
  TableRowActionClickHandlerType,
} from "@interfaces/Common/elementTypes";
import { normalizeTableColumns } from "@utils/table";

import { selectorColumn } from "./Columns/tableSelectorColumn";
import TableContentBody from "./TableContentBody/TableContentBody";
import TableContentHeader from "./TableContentHeader/TableContentHeader";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader/TableHeader";

type TableRowActionNameType = `on${string}`;

export interface CustomTableBodyProps<TData = unknown> {
  table?: TableCore<TData>;
  isLoading: boolean;
  rowSelection?: string[];
  [key: TableRowActionNameType]: TableRowActionClickHandlerType;
  [key: string]: unknown;
}

interface TableBaseProps<TData = TableDataType> {
  columns: Array<ColumnDef<TData, unknown>>;
  data: TData[];
  hiddenColumns?: Array<keyof TData | boolean>;
  pagination?: TablePaginationType;
  rowSelection?: RowSelectionState;
  rowSelectionType?: TableRowSelectionTypeEnum;
  onChangePagination?: OnChangeFn<TablePaginationType>;
  onChangeSorting?: OnChangeFn<SortingState>;
  onChangeFilters?: OnChangeFn<TableColumnFilterState[]>;
  onChangeRowSelection?: OnChangeFn<RowSelectionState>;
}

interface TableWithChildrenProps<TData = TableDataType> extends TableBaseProps<TData> {
  children: ReactElement<CustomTableBodyProps<TData>>;
  isLoading?: never;
  sorting?: never;
}

interface TableWithoutChildrenProps<TData = TableDataType> extends TableBaseProps<TData> {
  children?: never;
  isLoading?: boolean;
  sorting?: SortingState;
}

export type TableProps<TData = TableDataType> =
  | TableWithChildrenProps<TData>
  | TableWithoutChildrenProps<TData>;

const Table = ({
  data,
  columns: columnsProp,
  children,
  hiddenColumns = [],
  pagination,
  sorting,
  isLoading = false,
  rowSelection = {},
  rowSelectionType = TableRowSelectionTypeEnum.MULTIPLE,
  onChangePagination,
  onChangeSorting,
  onChangeFilters,
  onChangeRowSelection,
}: TableProps) => {
  const defaultPagination = useMemo<Required<TablePaginationType>>(
    () => ({
      page: 0,
      limit: DEFAULT_PAGE_SIZE,
      totalPages: 1,
      totalRows: 0,
    }),
    [],
  );
  const [totalPages, setTotalPages] = useState(1);

  const columns = useMemo(() => [selectorColumn, ...columnsProp], [columnsProp]);

  const table = useReactTable({
    data: data ?? [],
    columns: normalizeTableColumns(columns),
    pageCount: totalPages,
    manualPagination: true,
    state: {
      pagination: {
        ...defaultPagination,
        ...pagination,
        pageIndex: (pagination?.page ?? 1) - 1,
        pageSize: pagination?.limit ?? DEFAULT_PAGE_SIZE,
      },
      sorting,
      rowSelection,
      columnVisibility: hiddenColumns
        .filter((column) => typeof column === "string" && !column.startsWith("_"))
        .reduce((acc, column) => ({ ...acc, [String(column)]: false }), {}),
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: onChangeSorting,
    onPaginationChange: (state) => {
      if (typeof state === "function") {
        const newState = state(pagination as PaginationState);
        onChangePagination?.({ ...newState, page: newState.pageIndex + 1 });
        return;
      }
      onChangePagination?.(state as TablePaginationType);
    },
    onRowSelectionChange: (state) => {
      if (typeof state !== "function") {
        onChangeRowSelection?.(state);
        return;
      }

      if (rowSelectionType === TableRowSelectionTypeEnum.MULTIPLE) {
        onChangeRowSelection?.(state);
        return;
      }

      const newSelection = state(rowSelection);
      let newSelectionRowKey = "";

      keys(newSelection).forEach((key) => {
        if (newSelection[key] !== rowSelection[key]) {
          newSelectionRowKey = key;
        }
      });

      onChangeRowSelection?.({
        [newSelectionRowKey]: true,
      });
    },
    getRowId: (row) => row.id || row.code || Math.random().toString(36).substr(2, 9),
  });

  const tableRows = useMemo(() => table.getRowModel().rows, [table]);
  const tableHeaderGroup = useMemo(() => table.getHeaderGroups(), [table]);

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      table.setPagination({
        ...pagination,
        pageSize,
        pageIndex: 0,
      });
    },
    [pagination, table],
  );

  useEffect(() => {
    const paginationOptions = {
      ...defaultPagination,
      ...pagination,
    };
    const newTotalPages = Math.ceil(paginationOptions.totalRows / paginationOptions.limit) || 1;
    setTotalPages(newTotalPages);
  }, [defaultPagination, pagination]);

  return (
    <div>
      <TableHeader headerGroups={tableHeaderGroup} onChangeFilters={onChangeFilters} />
      {children &&
        cloneElement(children, {
          ...children.props,
          table,
        })}
      {!children && (
        <table className="relative min-w-full">
          <TableContentHeader headerGroups={tableHeaderGroup} />
          <TableContentBody rows={tableRows} headers={tableHeaderGroup[0].headers} isLoading={isLoading} />
        </table>
      )}
      {(Boolean(tableRows.length) || isLoading) && (
        <TableFooter
          isLoading={isLoading}
          page={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          dataLength={tableRows.length}
          totalRows={pagination?.totalRows ?? 0}
          totalPages={totalPages}
          // #skipcq: JS-0411
          onChangePageIndex={table.setPageIndex}
          onChangePageSize={handleChangePageSize}
        />
      )}
    </div>
  );
};

export default memo(Table);
