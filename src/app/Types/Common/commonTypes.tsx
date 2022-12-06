import { PaginationState } from '@tanstack/react-table';
import { AxiosError, AxiosResponse } from 'axios';

export interface AxiosErrorMessageType {
  [key: string]: string[];
}

export interface AxiosErrorDataType {
  statusCode: number;
  message: string;
  error: {
    code: number;
    message: string;
    error: AxiosErrorMessageType[];
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

export interface BaseQueryParamsType {
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
}
