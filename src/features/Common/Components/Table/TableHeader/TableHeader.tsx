import { HeaderGroup, OnChangeFn } from '@tanstack/react-table';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TableColumnFiltersState, TableGenericDataType } from '@interfaces/Common/elementTypes';

import { Input } from '@components/Form';

import TableHeaderFilterGroup from './TableHeaderFilterGroup';

export interface TableHeaderProps<TData = TableGenericDataType> {
  columnFilters?: TableColumnFiltersState;
  headerGroups: Array<HeaderGroup<TData>>;
  onChangeFilters?: OnChangeFn<TableColumnFiltersState>;
}

const TableHeader = ({ columnFilters = [], headerGroups, onChangeFilters }: TableHeaderProps) => {
  const GLOBAL_FILTER_ID = 'search';

  const { t } = useTranslation(['common'], {
    keyPrefix: 'table.header',
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const handleChangeFilter = useCallback((filters: TableColumnFiltersState) => {
    onChangeFilters?.(filters);
  }, []);

  const handleChangeFilterDebounced = useCallback(_.debounce(handleChangeFilter, 500), [onChangeFilters]);

  const handleChangeFilterState = (filterBy: string, values: string[]) => {
    if (values.length === 0) {
      handleChangeFilterDebounced(columnFilters.filter((filter) => filter.filterBy !== filterBy));
      return;
    }
    const newFilterStates = [...columnFilters];
    const filterState = newFilterStates.find((filter) => filter.filterBy === filterBy);
    if (filterState == null) {
      newFilterStates.push({ filterBy, values });
    } else {
      filterState.values = values;
    }
    handleChangeFilterDebounced?.(newFilterStates);
  };

  const handleChangeGlobalFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setGlobalFilterValue(value);
    handleChangeFilterState(GLOBAL_FILTER_ID, [value]);
  };

  const handleChangeColumnFilter = (filterBy: string, filterValues: string[]) => {
    handleChangeFilterState(filterBy, filterValues);
  };

  useEffect(() => {
    const globalFilter = columnFilters.find((filter) => filter.filterBy === GLOBAL_FILTER_ID);
    if (globalFilter != null) {
      setGlobalFilterValue(globalFilter.values[0]);
    }
  }, [columnFilters]);

  return (
    <div className="relative mb-2">
      <div className="flex flex-wrap items-center justify-start">
        <div className="mr-4 mb-4 flex-shrink-0">
          <Input
            name="tableGlobalFilter"
            className="z-0 w-full bg-gray-50 duration-100 hover:bg-gray-100"
            size="sm"
            placeholder={t('search.placeholder') ?? ''}
            // labelPostfix={<BiSearch className="flex-shrink-0 pt-px text-gray-400" size={16} />}
            value={globalFilterValue}
            onChange={handleChangeGlobalFilter}
          />
        </div>
        <TableHeaderFilterGroup headerGroups={headerGroups} onChangeFilters={handleChangeColumnFilter} />
      </div>
    </div>
  );
};

export default memo(TableHeader);
