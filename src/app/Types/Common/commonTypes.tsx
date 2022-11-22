import { PaginationState } from '@tanstack/react-table';
import { AxiosError, AxiosResponse } from 'axios';

export interface AxiosErrorMessageType {
  [key: string]: string[];
}

export interface AxiosErrorDataType {
  statusCode: number;
  message: string;
  errors: AxiosErrorMessageType[];
  code: string;
}

export type AxiosErrorType = AxiosError<AxiosErrorDataType>;

export interface TablePaginationType extends Omit<PaginationState, 'pageIndex' | 'pageSize'> {
  pageIndex?: number;
  pageSize?: number;
  totalRows?: number;
  totalPages?: number;
}

export interface ResponseMetaType {
  page: number;
  perPage: number;
  total: number;
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
  perPage?: number;
}
