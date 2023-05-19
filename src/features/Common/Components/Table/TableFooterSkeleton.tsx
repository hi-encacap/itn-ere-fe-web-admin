import { LoadingSkeleton } from "@components/Loading";

const TableFooterSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center space-x-4">
        <LoadingSkeleton className="h-9 w-16" />
        <LoadingSkeleton className="h-4 w-56" />
      </div>
      <LoadingSkeleton className="h-9 w-48" />
    </div>
  );
};

export default TableFooterSkeleton;
