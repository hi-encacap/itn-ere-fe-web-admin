import { PaginationState } from '@tanstack/react-table';
import { AxiosError, AxiosResponse } from 'axios';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface AxiosErrorDataType {
  statusCode: number;
  message: string;
  error: {
    code: number;
    message: string;
    field: Record<FieldPath<FieldValues>, string[]>;
  };
  code: string;
}

export type AxiosErrorType = AxiosError<AxiosErrorDataType>;

export interface TablePaginationType extends Omit<PaginationState, 'pageIndex' | 'pageSize'> {
  page?: number;
  limit?: number;
  totalRows?: number;
  totalPages?: number;
}

export interface ResponseMetaType {
  page: number;
  limit: number;
  totalRows: number;
  totalPages: number;
}

export interface ResponseWithMetaType<T = unknown> extends Partial<AxiosResponse> {
  data: T;
  meta: ResponseMetaType;
}

export interface AxiosResponseType<T> extends AxiosResponse {
  statusCode: number;
  message: string;
  meta: ResponseMetaType;
  data: {
    data: T;
  };
}

export interface BaseGetListQueryType extends Record<string, unknown> {
  page?: number;
  limit?: number;
  filterBy?: string;
  filterValue?: string;
  sortBy?: string;
  searchValue?: string;
  searchBy?: string;
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
