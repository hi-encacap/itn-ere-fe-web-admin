import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { flexRender, Header } from "@tanstack/react-table";
import _, { uniqBy } from "lodash";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { TableDataType, TableFilterOptionItemType } from "@interfaces/Common/elementTypes";

import TableHeaderFilterDropdown from "./TableHeaderFilterDropdown";
import { TableFilterOptionPrivateItemType } from "./TableHeaderFilterDropdownOptionItem";
import TableHeaderFilterLabel from "./TableHeaderFilterLabel";

export interface TableHeaderFilterProps {
  header: Header<TableDataType, unknown>;
  onChangeFilters?: (filterBy: string, selectedItems: string[]) => void;
}

const TableHeaderFilter = ({ header, onChangeFilters }: TableHeaderFilterProps) => {
  const headerColumnDef = header.column.columnDef;

  const filterBy = useMemo(() => {
    const originalFilterBy = headerColumnDef.meta?.filterBy ?? headerColumnDef.id;
    return (Array.isArray(originalFilterBy) ? _.first(originalFilterBy) : originalFilterBy) ?? "";
  }, [headerColumnDef]);

  const filterValueBy = useMemo(
    () => headerColumnDef.meta?.filterValueBy ?? filterBy,
    [headerColumnDef, filterBy],
  );

  const filterLabelBy = useMemo(() => headerColumnDef.meta?.filterLabelBy, [headerColumnDef, filterBy]);
  const filterSearchBy = useMemo(
    () => headerColumnDef.meta?.filterSearchBy ?? filterBy,
    [headerColumnDef, filterBy],
  );
  const filterLabelFormatter = useMemo(() => headerColumnDef.meta?.filterLabelFormatter, [headerColumnDef]);

  const [filterOptions, setFilterOptions] = useState<TableFilterOptionPrivateItemType[]>([]);
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const [queryParams, setQueryParams] = useState<IBaseListQuery>({
    searchBy: filterSearchBy,
    searchValue: "",
  });

  const isInitialMount = useRef(false);

  const label = useMemo(() => {
    const originalLabel =
      headerColumnDef.meta?.filterLabel ?? flexRender(headerColumnDef.header, header.getContext());
    const filterLabels: string[] = [];

    selectedFilters.forEach((filter) => {
      const filterOption = filterOptions.find((option) => option.value === filter);

      if (!filterOption) {
        return;
      }

      if (filterLabelFormatter) {
        filterLabels.push(filterLabelFormatter(filterOption.value));
        return;
      }

      filterLabels.push(filterOption.label);
    });

    return <TableHeaderFilterLabel label={originalLabel} selectedFilters={filterLabels} />;
  }, [headerColumnDef, selectedFilters]);

  const containerRef = useRef<HTMLDivElement>(null);

  const formatFilterOptions = useCallback(
    (rawOptions: TableFilterOptionItemType[]) => {
      const originalFilterBy = headerColumnDef.meta?.filterBy;

      const options: TableFilterOptionPrivateItemType[] = [];

      rawOptions.forEach((rawOption) => {
        let filterValue = "";
        let filterLabel = "";

        if (Array.isArray(originalFilterBy)) {
          filterValue = originalFilterBy.reduce((acc, filter) => `${acc} ${rawOption[filter]}`, "");
        } else {
          filterValue = _.get(rawOption, filterValueBy ?? filterLabelBy ?? filterBy);
        }

        if (filterLabelBy) {
          filterLabel = _.get(rawOption, filterLabelBy);
        } else {
          filterLabel = filterValue;
        }

        if (!filterValue) {
          return;
        }

        options.push({
          value: filterValue,
          label: filterLabelFormatter ? filterLabelFormatter(filterLabel) : filterLabel,
        });
      });

      return uniqBy(options, "value");
    },
    [filterLabelBy],
  );

  const getFilterOptions = useCallback(
    (customQuery?: IBaseListQuery) => {
      setIsLoading(true);
      headerColumnDef.meta
        ?.getFilterOptions?.(customQuery ?? queryParams)
        .then((options: unknown[]) => {
          if ("data" in options) {
            setFilterOptions(formatFilterOptions(options.data as TableFilterOptionItemType[]));
            return;
          }
          if (Array.isArray(options)) {
            setFilterOptions(formatFilterOptions(options));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [headerColumnDef, queryParams],
  );

  const getFilterOptionsDebounced = useCallback(_.debounce(getFilterOptions, 500), []);

  const handleToggleDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu((prev) => !prev);
  }, []);

  const handleChangeFilters = useCallback((filters: string[]) => {
    setSelectedFilters(filters);
    onChangeFilters?.(filterBy, filters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
    onChangeFilters?.(filterBy, []);
  }, []);

  useEffect(() => {
    if (containerRef.current === null) {
      return undefined;
    }
    const toggleButtonElement = containerRef.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleButtonElement.contains(event.target as Node)) {
        return;
      }
      setIsShowDropdownMenu(false);
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [containerRef.current]);

  useEffect(() => {
    if (!isShowDropdownMenu || isInitialMount.current) {
      return;
    }
    getFilterOptions();
    isInitialMount.current = true;
  }, [isShowDropdownMenu]);

  useEffect(() => {
    const newQueryParams = {
      ...queryParams,
      searchValue: filterSearchValue,
    };
    if (_.isEqual(newQueryParams, queryParams)) {
      return;
    }
    setQueryParams(newQueryParams);
    getFilterOptionsDebounced(newQueryParams);
  }, [filterSearchValue]);

  return (
    <div className="relative z-20 mb-4 mr-4 h-10 rounded-lg last:mr-0" ref={containerRef}>
      <div
        className={twMerge(
          "flex h-full w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-gray-100 bg-gray-50 pl-4 pr-2.5 duration-100 hover:border-gray-200 hover:bg-gray-100",
          isShowDropdownMenu && "border-gray-200 bg-gray-100",
          !(selectedFilters.length === 0) &&
            "border-blue-500 bg-blue-50 hover:border-blue-500 hover:bg-blue-50",
        )}
        role="button"
        tabIndex={0}
        aria-hidden="true"
        onClick={handleToggleDropdownMenu}
      >
        <div>{label}</div>
        <BiChevronDown size={20} />
      </div>
      {isShowDropdownMenu && (
        <TableHeaderFilterDropdown
          filterOptions={filterOptions}
          isLoading={isLoading}
          filterSearchValue={filterSearchValue}
          selectedFilters={selectedFilters}
          onChangeFilters={handleChangeFilters}
          onChangeFilterSearchValue={setFilterSearchValue}
          onClearSelectedFilters={handleClearFilters}
        />
      )}
    </div>
  );
};

export default memo(TableHeaderFilter);
