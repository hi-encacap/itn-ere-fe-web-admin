import { LoadingSkeleton } from "@components/Loading";

export interface TableRowActionSkeletonProps {
  numberOfActions?: number;
}

const TableRowActionSkeleton = ({ numberOfActions = 2 }: TableRowActionSkeletonProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {Array.from({ length: numberOfActions || 1 }).map((_, index) => (
        // #skipcq: JS-0437
        <LoadingSkeleton key={index} className="h-8 w-8" />
      ))}
    </div>
  );
};

export default TableRowActionSkeleton;
