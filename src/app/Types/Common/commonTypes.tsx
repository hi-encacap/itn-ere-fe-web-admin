import { PaginationState } from '@tanstack/react-table';
import { Control } from 'react-hook-form';

export interface TablePaginationType extends Omit<PaginationState, 'pageIndex' | 'pageSize'> {
  page?: number;
  limit?: number;
  totalRows?: number;
  totalPages?: number;
}

export interface FormGenericErrorType {
  message: string;
  code: string;
  trackingCode?: string;
}

export interface SidebarItemType {
  key: string;
  icon: JSX.Element;
  label: string;
  to: string;
  children?: SidebarItemType[];
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// #skipcq: JS-0323
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HookFormControl = Control<any>;
