import { IBaseListQuery, IResponseWithMeta } from "@encacap-group/common/dist/base";
import { PaginationState } from "@tanstack/react-table";
import { Key, ReactElement } from "react";
import { Control } from "react-hook-form";

export interface TablePaginationType extends Omit<PaginationState, "pageIndex" | "pageSize"> {
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
  children?: SidebarItemType[];
  icon: ReactElement;
  isLoading?: boolean;
  key: string;
  label: string;
  to: string;
  pathPattern?: string;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// #skipcq: JS-0323
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HookFormControl = Control<any>;

export type ServiceGetManyFunctionType<T> = (query?: IBaseListQuery) => Promise<IResponseWithMeta<T[]>>;
export type ServiceGetAllFunctionType<T> = (query?: IBaseListQuery) => Promise<T[]>;
export type ServiceAddFunctionType<T> = (data: T) => Promise<unknown>;
export type ServiceUpdateFunctionType<T> = (id: Key, data: T) => Promise<unknown>;
export type ServiceDeleteFunctionType = (id: Key) => Promise<unknown>;

export type TableOnclickFunctionType = (id: Key) => void;
