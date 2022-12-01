import _ from 'lodash';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingSkeleton } from '@components/Loading';

import TableHeaderFilterDropdownOptionItem, {
  TableFilterOptionPrivateItemType,
} from './TableHeaderFilterDropdownOptionItem';
import TableHeaderFilterDropdownSkeleton from './TableHeaderFilterDropdownSkeleton';

export interface TableHeaderFilterDropdownProps {
  filterOptions: TableFilterOptionPrivateItemType[];
  isLoading?: boolean;
  selectedFilters: string[];
  filterSearchValue: string;
  onChangeFilters: (selectedItems: string[]) => void;
  onChangeFilterSearchValue: (searchValue: string) => void;
  onClearSelectedFilters: () => void;
}

const TableHeaderFilterDropdown = ({
  isLoading,
  filterOptions,
  selectedFilters,
  filterSearchValue,
  onChangeFilters,
  onChangeFilterSearchValue,
  onClearSelectedFilters,
}: TableHeaderFilterDropdownProps) => {
  const { t } = useTranslation(['common'], {
    keyPrefix: 'common:table.header.filter',
  });

  const handleChangeSelectedFilter = useCallback(
    (value: string, checked: boolean) => {
      let newSelectedFilters = [...selectedFilters];
      if (checked) {
        newSelectedFilters.push(value);
      } else {
        const index = newSelectedFilters.indexOf(value);
        if (index > -1) {
          newSelectedFilters.splice(index, 1);
        }
      }
      newSelectedFilters = _.uniq(newSelectedFilters);
      onChangeFilters?.(newSelectedFilters);
    },
    [selectedFilters, onChangeFilters],
  );

  const handleChangeFilterSearchValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChangeFilterSearchValue(value);
  }, []);

  const handleClearSelectedFilters = useCallback(() => {
    onClearSelectedFilters?.();
  }, []);

  return (
    <div className="absolute top-12 z-10 flex max-w-xs flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-4 text-slate-700 shadow-lg shadow-gray-100">
      <input
        id="filterValue"
        name="filterValue"
        placeholder={t('search.placeholder') ?? ''}
        className="h-10 border-b-2 border-gray-50 outline-none disabled:cursor-not-allowed disabled:bg-transparent"
        disabled={isLoading}
        autoComplete="off"
        value={filterSearchValue}
        onChange={handleChangeFilterSearchValue}
      />
      <div className="relative pt-2 pb-2.5">
        {!isLoading &&
          filterOptions?.map((option) => (
            <TableHeaderFilterDropdownOptionItem
              key={option.value}
              option={option}
              isSelected={selectedFilters.includes(option.value)}
              onChange={handleChangeSelectedFilter}
            />
          ))}
        {isLoading && <TableHeaderFilterDropdownSkeleton />}
      </div>
      <div className="border-t-2 border-gray-100">
        {isLoading ? (
          <LoadingSkeleton className="my-3 h-4 w-full" />
        ) : (
          <button
            type="button"
            className="pt-1.5 pb-2 text-left font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            onClick={handleClearSelectedFilters}
          >
            {t('clearSelection')}
          </button>
        )}
      </div>
    </div>
  );
};

export default TableHeaderFilterDropdown;
