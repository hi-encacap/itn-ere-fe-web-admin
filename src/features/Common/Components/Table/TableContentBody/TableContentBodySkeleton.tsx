import { Header, RowData } from '@tanstack/react-table';

import TableContentBodySkeletonItem from './TableContentBodySkeletonItem';

interface TableContentBodySkeletonProps<T = RowData> {
  headers: Array<Header<T, RowData>>;
}

const TableContentBodySkeleton = ({ headers }: TableContentBodySkeletonProps) => {
  return (
    <tr>
      {headers.map((header) => (
        <td key={header.id} className="border-b border-gray-50 p-4">
          <TableContentBodySkeletonItem header={header} />
        </td>
      ))}
    </tr>
  );
};

export default TableContentBodySkeleton;
