import { HeaderGroup, OnChangeFn } from "@tanstack/react-table";
import { debounce } from "lodash";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { TABLE_FILTER_GLOBAL_FILTER_ID } from "@constants/defaultValues";
import { TableColumnFilterState, TableDataType } from "@interfaces/Common/elementTypes";
import { Input } from "@components/Form";

import TableHeaderFilterGroup from "./TableHeaderFilterGroup";

export interface TableHeaderProps<TData = TableDataType> {
  headerGroups: Array<HeaderGroup<TData>>;
  onChangeFilters?: OnChangeFn<TableColumnFilterState[]>;
}

const TableHeader = ({ headerGroups, onChangeFilters }: TableHeaderProps) => {
  const { t } = useTranslation(["common"], {
    keyPrefix: "table.header",
  });

  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const handleChangeFilterDebounced = useCallback(
    debounce((filters: TableColumnFilterState[]) => {
      onChangeFilters?.(filters);
    }, 500),
    [],
  );

  const handleChangeFilterState = useCallback(
    (filterBy: string, values: string[]) => {
      let newFilters = [];

      if (values.length === 0) {
        newFilters = columnFilters.filter((filter) => filter.filterBy !== filterBy);
      } else {
        const index = columnFilters.findIndex((filter) => filter.filterBy === filterBy);

        if (index > -1) {
          newFilters = [...columnFilters];
          newFilters[index].values = values;
        } else {
          newFilters = [...columnFilters, { filterBy, values }];
        }
      }

      handleChangeFilterDebounced?.(newFilters);
      setColumnFilters(newFilters);
    },
    [columnFilters],
  );

  const handleChangeGlobalFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setGlobalFilterValue(value);
      handleChangeFilterState(TABLE_FILTER_GLOBAL_FILTER_ID, [value]);
    },
    [setGlobalFilterValue, handleChangeFilterState],
  );

  return (
    <div className="relative mb-2">
      <div className="flex flex-wrap items-center justify-start">
        <div className="mb-4 mr-4 flex-shrink-0">
          <Input
            name="tableGlobalFilter"
            className="z-0 w-full bg-gray-50 duration-100 hover:bg-gray-100"
            size="sm"
            placeholder={t("search.placeholder") ?? ""}
            value={globalFilterValue}
            onChange={handleChangeGlobalFilter}
          />
        </div>
        <TableHeaderFilterGroup headerGroups={headerGroups} onChangeFilters={handleChangeFilterState} />
      </div>
    </div>
  );
};

export default memo(TableHeader);
