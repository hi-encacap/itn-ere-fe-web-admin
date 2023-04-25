import { flexRender, Header, Row, RowData } from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';

import TableContentBodyColumnContent from './TableContentBodyColumnContent';
import TableBodyEmpty from './TableContentBodyEmpty';
import TableContentBodySkeleton from './TableContentBodySkeleton';

interface TableContentProps<T = RowData> {
  rows: Array<Row<T>>;
  headers: Array<Header<T, unknown>>;
  isLoading?: boolean;
}

const TableContentBody = ({ rows, headers, isLoading = false }: TableContentProps) => {
  const totalSkeletonItems = 4;

  return (
    <tbody>
      {rows.length === 0 &&
        isLoading &&
        Array.from({ length: totalSkeletonItems }).map((_, index) => (
          // #skipcq: JS-0437
          // eslint-disable-next-line react/no-array-index-key
          <TableContentBodySkeleton key={index} headers={headers} />
        ))}
      {rows.length === 0 && !isLoading && <TableBodyEmpty columns={headers.length} />}
      {rows.length > 0 &&
        rows.map((row) => (
          <tr key={row.id} data-key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={twMerge(
                  'border-b border-gray-100 bg-white py-4 px-4 text-center',
                  cell.column.id === 'selector' && 'sticky left-0',
                  cell.column.id === 'actions' && 'sticky right-0',
                  isLoading && 'opacity-50',
                )}
              >
                <TableContentBodyColumnContent
                  content={flexRender(cell.column.columnDef.cell, cell.getContext())}
                />
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

export default TableContentBody;
