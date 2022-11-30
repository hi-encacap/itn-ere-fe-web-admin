import { flexRender, HeaderGroup } from '@tanstack/react-table';

import { TableDataType } from '@interfaces/Common/elementTypes';

import TableContentHeaderColumn from './TableContentHeaderColumn';

export interface TableContentHeaderProps<TData = TableDataType> {
  headerGroups: Array<HeaderGroup<TData>>;
}

const TableContentHeader = <T extends object>({ headerGroups }: TableContentHeaderProps<T>) => {
  return (
    <thead className="overflow-hidden">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className="relative">
          {headerGroup.headers.map((header) => (
            <TableContentHeaderColumn
              key={header.id}
              id={header.id}
              isSorted={header.column.getIsSorted()}
              isSortable={header.column.getCanSort()}
              toggleSorting={header.column.toggleSorting}
            >
              <div>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            </TableContentHeaderColumn>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableContentHeader;
