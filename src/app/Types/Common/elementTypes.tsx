import { ColumnDef as ReactTableColumnDef, RowData } from '@tanstack/react-table';
import { Key } from 'react';
import { AnySchema } from 'yup';

export type AlertType = 'default' | 'success' | 'warning' | 'error';

export type ContentWrapperHeaderActionType = Record<string, unknown>;

export interface SelectOptionItemType {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type ConfirmationModalStatusType = 'success' | 'danger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnDef<T = RowData> = ReactTableColumnDef<T, any>;

export type TableRowActionClickHandlerType<T = Key> = (id: T) => void;

export type TableRowActionStatusType = 'normal' | 'danger';

export interface TableRowActionDropdownItemType<TIDData = Key> {
  key: string;
  label: string;
  icon?: JSX.Element;
  className?: string;
  onClick: TableRowActionClickHandlerType<TIDData>;
}

export interface TableColumnFilterState {
  filterBy: string;
  values: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableDataType = any;

export interface TableFilterOptionItemType {
  [key: string]: string;
  id: string;
}

export type FormElementSizeType = 'xs' | 'sm' | 'normal';

export interface FormElementBaseProps {
  name: string;
  className?: string;
  error?: string;
  label?: string;
  placeholder?: string;
}

export interface FormImageInputDataType {
  id: string;
  file: File | null;
  preview: string;
  error?: string;
}

export type FormValidationSchemaShapeType<T> = {
  [P in keyof T]: AnySchema;
};
