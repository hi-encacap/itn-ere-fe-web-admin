/// <reference types="@tanstack/react-table" />

declare module "@tanstack/react-table" {
  export interface ColumnMeta<TData extends RowData, TValue> {
    skeleton?: JSX.Element;
    filterBy?: string | string[];
    filterValueBy?: string;
    filterLabelBy?: string;
    filterLabel?: string;
    filterSearchBy?: string;
    getFilterOptions?: (params?: IBaseListQuery) => Promise<unknown[]>;
    filterLabelFormatter?: (value: any) => string;
  }
}

export {};
