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
import { keys } from 'lodash';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_PAGE_SIZE } from '@constants/defaultValues';
import { TABLE_ROW_SELECTION_TYPE_ENUM } from '@constants/enums';
import { BaseGetListQueryType, TablePaginationType } from '@interfaces/Common/commonTypes';
import { TableColumnFilterState, TableDataType } from '@interfaces/Common/elementTypes';

import { normalizeTableColumns } from '@utils/table';

import { selectorColumn } from './Columns/tableSelectorColumn';
import TableContentBody from './TableContentBody/TableContentBody';
import TableContentHeader from './TableContentHeader/TableContentHeader';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader/TableHeader';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    skeleton?: JSX.Element;
    filterBy?: string | string[];
    filterValueBy?: string;
    filterLabelBy?: string;
    filterLabel?: string;
    filterSearchBy?: string;
    getFilterOptions?: (params?: BaseGetListQueryType) => Promise<unknown[]>;
    filterLabelFormatter?: (value: unknown) => string;
  }
}

export interface CustomTableBodyProps<TData = TableDataType> {
  data: TData[];
  isLoading: boolean;
}

export interface TableProps<TData = TableDataType> {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  pagination?: TablePaginationType;
  sorting?: SortingState;
  isLoading?: boolean;
  rowSelection?: RowSelectionState;
  rowSelectionType?: TABLE_ROW_SELECTION_TYPE_ENUM;
  renderTableBody?: (props: CustomTableBodyProps) => ReactElement;
  onChangePagination?: OnChangeFn<TablePaginationType>;
  onChangeSorting?: OnChangeFn<SortingState>;
  onChangeFilters?: OnChangeFn<TableColumnFilterState[]>;
  onChangeRowSelection?: OnChangeFn<RowSelectionState>;
}

const Table = ({
  data,
  columns: columnsProp,
  pagination,
  sorting,
  isLoading = false,
  rowSelection = {},
  rowSelectionType = TABLE_ROW_SELECTION_TYPE_ENUM.MULTIPLE,
  renderTableBody,
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
    data,
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
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: onChangeSorting,
    onPaginationChange: (state) => {
      if (typeof state === 'function') {
        const newState = state(pagination as PaginationState);
        onChangePagination?.({ ...newState, page: newState.pageIndex + 1 });
        return;
      }
      onChangePagination?.(state as TablePaginationType);
    },
    onRowSelectionChange: (state) => {
      if (typeof state !== 'function') {
        onChangeRowSelection?.(state);
        return;
      }

      if (rowSelectionType === TABLE_ROW_SELECTION_TYPE_ENUM.MULTIPLE) {
        onChangeRowSelection?.(state);
        return;
      }

      const newSelection = state(rowSelection);
      let newSelectionRowKey = '';

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

  const tableRows = useMemo(() => table.getRowModel().rows, [data]);
  const tableHeaderGroup = useMemo(() => table.getHeaderGroups(), [data]);

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      table.setPagination({
        ...pagination,
        pageSize,
        pageIndex: 0,
      });
    },
    [pagination],
  );

  useEffect(() => {
    const paginationOptions = {
      ...defaultPagination,
      ...pagination,
    };
    const newTotalPages = Math.ceil(paginationOptions.totalRows / paginationOptions.limit) || 1;
    setTotalPages(newTotalPages);
  }, [pagination]);

  return (
    <div>
      <TableHeader headerGroups={tableHeaderGroup} onChangeFilters={onChangeFilters} />
      <div className="overflow-auto">
        {renderTableBody ? (
          renderTableBody({
            data,
            isLoading,
          })
        ) : (
          <table className="relative min-w-full">
            <TableContentHeader headerGroups={tableHeaderGroup} />
            <TableContentBody rows={tableRows} headers={tableHeaderGroup[0].headers} isLoading={isLoading} />
          </table>
        )}
      </div>
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

export default Table;
