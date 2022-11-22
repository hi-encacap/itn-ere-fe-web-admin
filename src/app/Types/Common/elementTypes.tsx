import { ColumnDef as ReactTableColumnDef, RowData } from '@tanstack/react-table';

export type AlertType = 'default' | 'success' | 'warning' | 'error';

export type ContentWrapperHeaderActionType = Record<string, unknown>;

export type TableStatusTagStatusType = 'default' | 'success' | 'warning' | 'error';

export interface SelectOptionType {
  value?: string | number;
  label?: string;
}

export type ConfirmationModalStatusType = 'success' | 'danger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnDef<T = RowData> = ReactTableColumnDef<T, any>;

export type TableRowActionClickHandlerType = (id: number | undefined) => void;

export type TableRowActionStatusType = 'normal' | 'danger';

export interface TableRowActionDropdownItemType {
  key: string;
  label: string;
  icon?: JSX.Element;
  className?: string;
  onClick: TableRowActionClickHandlerType;
}

export interface TableColumnFilterState {
  filterBy: string;
  values: string[];
}

export type TableColumnFiltersState = TableColumnFilterState[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableGenericDataType = any;

export interface TableFilterOptionItemType {
  [key: string]: string;
  uuid: string;
}
