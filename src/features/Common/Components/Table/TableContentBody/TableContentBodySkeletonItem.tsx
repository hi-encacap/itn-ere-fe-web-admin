import { flexRender, Header } from '@tanstack/react-table';
import { ReactNode, useMemo } from 'react';

import { LoadingSkeleton } from '@components/Loading';

import TableRowActionSkeleton from '../TableRowActionSkeleton';

interface TableContentBodySkeletonItemProps {
  header: Header<unknown, unknown>;
}

const TableContentBodySkeletonItem = ({ header }: TableContentBodySkeletonItemProps): JSX.Element => {
  const columnMeta = useMemo(() => header.column.columnDef.meta, [header.column.columnDef.meta]);

  if (header.id === 'actions' && !columnMeta?.skeleton) {
    return <TableRowActionSkeleton />;
  }

  if (columnMeta?.skeleton !== null && columnMeta?.skeleton !== undefined) {
    const element = flexRender(columnMeta.skeleton, header.getContext()) as ReactNode;
    return element as JSX.Element;
  }

  return <LoadingSkeleton className="h-4 w-full" />;
};

export default TableContentBodySkeletonItem;
