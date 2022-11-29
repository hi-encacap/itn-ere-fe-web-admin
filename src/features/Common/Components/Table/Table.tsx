import {
  ColumnDef,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import { DEFAULT_PAGE_SIZE } from '@constants/defaultValues';
import { BaseQueryParamsType, TablePaginationType } from '@interfaces/Common/commonTypes';
import { TableColumnFiltersState, TableGenericDataType } from '@interfaces/Common/elementTypes';

import { normalizeTableColumns } from '@utils/table';

import { selectorColumn } from './Columns/SelectorColumn';
import TableContentBody from './TableContentBody/TableContentBody';
import TableContentHeader from './TableContentHeader/TableContentHeader';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader/TableHeader';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    skeleton?: JSX.Element;
    filterBy?: string | string[];
    filterLabel?: string;
    getFilterOptions?: (params?: BaseQueryParamsType) => Promise<unknown[]>;
  }
}

export interface TableProps<TData = TableGenericDataType> {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  pagination?: TablePaginationType;
  sorting?: SortingState;
  columnFilters?: TableColumnFiltersState;
  rowSelection?: RowSelectionState;
  isLoading?: boolean;
  onChangePagination?: OnChangeFn<TablePaginationType>;
  onChangeSorting?: OnChangeFn<SortingState>;
  onChangeFilters?: OnChangeFn<TableColumnFiltersState>;
  onChangeRowSelection?: OnChangeFn<RowSelectionState>;
}

const Table = ({
  data,
  columns: columnsProp,
  pagination,
  sorting,
  columnFilters,
  rowSelection = {},
  isLoading = false,
  onChangePagination,
  onChangeSorting,
  onChangeFilters,
  onChangeRowSelection,
}: TableProps) => {
  const defaultPagination = useMemo<Required<TablePaginationType>>(
    () => ({
      pageIndex: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      totalPages: 1,
      totalRows: 0,
    }),
    [],
  );
  const [totalPages, setTotalPages] = useState(1);

  const columns = useMemo(() => [selectorColumn, ...columnsProp], [columnsProp]);

  const table = useReactTable({
    data,
    columns: normalizeTableColumns(columns),
    pageCount: totalPages,
    manualPagination: true,
    state: {
      pagination: {
        ...defaultPagination,
        ...pagination,
        pageIndex: (pagination?.pageIndex ?? 1) - 1,
      },
      sorting,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: onChangeSorting,
    onPaginationChange: (state) => {
      if (typeof state === 'function') {
        const newState = state(pagination as PaginationState);
        onChangePagination?.({ ...newState, pageIndex: newState.pageIndex + 1 });
        return;
      }
      onChangePagination?.(state as TablePaginationType);
    },
    onRowSelectionChange: onChangeRowSelection,
    getRowId: (row) => row.id || row.code || 0,
  });

  const tableRows = useMemo(() => table.getRowModel().rows, [data]);
  const tableHeaderGroup = useMemo(() => table.getHeaderGroups(), [data]);

  const handleChangePageSize = (pageSize: number) => {
    table.setPagination({
      ...pagination,
      pageSize,
      pageIndex: 0,
    });
  };

  useEffect(() => {
    const paginationOptions = {
      ...defaultPagination,
      ...pagination,
    };
    const newTotalPages = Math.ceil(paginationOptions.totalRows / paginationOptions.pageSize) || 1;
    setTotalPages(newTotalPages);
  }, [pagination]);

  return (
    <div>
      <TableHeader
        columnFilters={columnFilters}
        headerGroups={tableHeaderGroup}
        onChangeFilters={onChangeFilters}
      />
      <div className="overflow-auto">
        <table className="relative min-w-full">
          <TableContentHeader headerGroups={tableHeaderGroup} />
          <TableContentBody rows={tableRows} headers={tableHeaderGroup[0].headers} isLoading={isLoading} />
        </table>
      </div>
      {(!!tableRows.length || isLoading) && (
        <TableFooter
          isLoading={isLoading}
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          dataLength={tableRows.length}
          totalRows={pagination?.totalRows ?? 0}
          totalPages={totalPages}
          onChangePageIndex={table.setPageIndex}
          onChangePageSize={handleChangePageSize}
        />
      )}
    </div>
  );
};

export default Table;
