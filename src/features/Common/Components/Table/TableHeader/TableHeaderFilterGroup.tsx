import { HeaderGroup } from '@tanstack/react-table';

import { TableGenericDataType } from '@interfaces/Common/elementTypes';

import TableHeaderFilter from './TableHeaderFilter';

export interface TableHeaderFilterGroupProps<TData = TableGenericDataType> {
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

export default TableHeaderFilterGroup;
