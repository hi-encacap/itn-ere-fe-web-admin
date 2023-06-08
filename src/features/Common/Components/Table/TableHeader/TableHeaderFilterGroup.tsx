import { HeaderGroup } from "@tanstack/react-table";
import { memo } from "react";

import { TableDataType } from "@interfaces/Common/elementTypes";

import TableHeaderFilter from "./TableHeaderFilter";

export interface TableHeaderFilterGroupProps<TData = TableDataType> {
  headerGroups: Array<HeaderGroup<TData>>;
  onChangeFilters?: (filterBy: string, filterValues: string[]) => void;
}

const TableHeaderFilterGroup = ({ headerGroups, onChangeFilters }: TableHeaderFilterGroupProps) => {
  return (
    <>
      {headerGroups.map((headerGroup) =>
        headerGroup.headers
          .filter(
            ({
              column: {
                columnDef: { meta },
              },
            }) => meta?.getFilterOptions,
          )
          .map((header) => (
            <TableHeaderFilter key={header.id} header={header} onChangeFilters={onChangeFilters} />
          )),
      )}
    </>
  );
};

export default memo(TableHeaderFilterGroup);
