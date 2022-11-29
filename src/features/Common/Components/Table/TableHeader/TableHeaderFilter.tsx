import { flexRender, Header } from '@tanstack/react-table';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

import { BaseQueryParamsType } from '@interfaces/Common/commonTypes';
import { TableFilterOptionItemType, TableGenericDataType } from '@interfaces/Common/elementTypes';

import TableHeaderFilterDropdown from './TableHeaderFilterDropdown';
import TableHeaderFilterLabel from './TableHeaderFilterLabel';

export interface TableHeaderFilterProps {
  header: Header<TableGenericDataType, unknown>;
  onChangeFilters?: (filterBy: string, selectedItems: string[]) => void;
}

const TableHeaderFilter = ({ header, onChangeFilters }: TableHeaderFilterProps) => {
  const headerColumnDef = header.column.columnDef;

  const filterBy = useMemo(() => {
    const originalFilterBy = headerColumnDef.meta?.filterBy ?? headerColumnDef.id;
    return (Array.isArray(originalFilterBy) ? _.first(originalFilterBy) : originalFilterBy) ?? '';
  }, [headerColumnDef]);

  const [filterOptions, setFilterOptions] = useState<TableFilterOptionItemType[]>([]);
  const [filterSearchValue, setFilterSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const [queryParams, setQueryParams] = useState<BaseQueryParamsType>({
    filterBy,
    filterValue: '',
  });

  const label = useMemo(() => {
    const originalLabel =
      headerColumnDef.meta?.filterLabel ?? flexRender(headerColumnDef.header, header.getContext());
    return <TableHeaderFilterLabel label={originalLabel} selectedFilters={selectedFilters} />;
  }, [headerColumnDef, selectedFilters]);

  const containerRef = useRef<HTMLDivElement>(null);

  const rawGetFilterOptions = useMemo(() => headerColumnDef.meta?.getFilterOptions, [headerColumnDef]);

  const formatFilterOptions = useCallback(
    (options: TableFilterOptionItemType[]): TableFilterOptionItemType[] => {
      const originalFilterBy = headerColumnDef.meta?.filterBy;
      return _.unionBy(
        options
          .map((option) => {
            let filterValue = '';

            if (Array.isArray(originalFilterBy)) {
              filterValue = originalFilterBy.reduce((acc, filter) => `${acc} ${option[filter]}`, '');
            } else {
              filterValue = _.get(option, filterBy);
            }

            if (!filterValue) {
              return null;
            }

            return {
              ...option,
              [filterBy]: filterValue,
            };
          })
          .filter(Boolean) as TableFilterOptionItemType[],
        filterBy,
      );
    },
    [],
  );

  const getFilterOptions = useCallback((query?: BaseQueryParamsType) => {
    setIsLoading(true);
    rawGetFilterOptions?.(query)
      .then((options: unknown[]) => {
        if ('data' in options) {
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
  }, []);

  const handleToggleDropdownMenu = () => {
    setIsShowDropdownMenu((prev) => !prev);
  };

  const handleChangeFilters = (filters: string[]) => {
    setSelectedFilters(filters);
    onChangeFilters?.(filterBy, filters);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    onChangeFilters?.(filterBy, []);
  };

  useEffect(() => {
    if (containerRef.current == null) {
      return undefined;
    }
    const toggleButtonElement = containerRef.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleButtonElement.contains(event.target as Node)) {
        return;
      }
      setIsShowDropdownMenu(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [containerRef.current]);

  useEffect(() => {
    if (!isShowDropdownMenu || !(filterOptions.length === 0)) {
      return;
    }
    getFilterOptions();
  }, [isShowDropdownMenu]);

  useEffect(() => {
    const newQueryParams = {
      filterBy,
      filterValue: filterSearchValue,
    };
    if (_.isEqual(newQueryParams, queryParams)) {
      return;
    }
    setQueryParams(newQueryParams);
    getFilterOptions(newQueryParams);
  }, [filterSearchValue]);

  return (
    <div className="relative z-20 mr-4 mb-4 h-10 rounded-lg last:mr-0" ref={containerRef}>
      <div
        className={twMerge(
          'flex h-full w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-gray-100 bg-gray-50 pl-4 pr-2.5 duration-100 hover:border-gray-200 hover:bg-gray-100',
          isShowDropdownMenu && 'border-gray-200 bg-gray-100',
          !(selectedFilters.length === 0) &&
            'border-blue-500 bg-blue-50 hover:border-blue-500 hover:bg-blue-50',
        )}
        role="button"
        tabIndex={0}
        onClick={handleToggleDropdownMenu}
      >
        <div>{label}</div>
        <BiChevronDown size={20} />
      </div>
      {isShowDropdownMenu && (
        <TableHeaderFilterDropdown
          filterBy={filterBy}
          filterOptions={filterOptions}
          isLoading={isLoading}
          selectedFilters={selectedFilters}
          onChangeFilters={handleChangeFilters}
          onChangeFilterSearchValue={setFilterSearchValue}
          onClearSelectedFilters={handleClearFilters}
        />
      )}
    </div>
  );
};

export default TableHeaderFilter;
