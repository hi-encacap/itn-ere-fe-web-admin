import { LoadingSkeleton } from "@components/Loading";

const TableHeaderFilterDropdownSkeleton = () => {
  return (
    <div className="">
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton className="h-5 w-5 flex-shrink-0 rounded-md" />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton className="h-5 w-5 flex-shrink-0 rounded-md" />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton className="h-5 w-5 flex-shrink-0 rounded-md" />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton className="h-5 w-5 flex-shrink-0 rounded-md" />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default TableHeaderFilterDropdownSkeleton;
