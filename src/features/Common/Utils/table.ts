import { ColumnDef } from '@tanstack/react-table';

const normalizeTableColumn = <TData = unknown>(column: ColumnDef<TData>): ColumnDef<TData> => {
  const defaultCellColumn: ColumnDef<TData>['cell'] = (info) => info.getValue() ?? '-';
  return {
    cell: defaultCellColumn,
    ...column,
  };
};

const normalizeTableColumns = <TData = unknown>(columns: Array<ColumnDef<TData>>): Array<ColumnDef<TData>> =>
  columns.map(normalizeTableColumn);

export { normalizeTableColumn, normalizeTableColumns };
