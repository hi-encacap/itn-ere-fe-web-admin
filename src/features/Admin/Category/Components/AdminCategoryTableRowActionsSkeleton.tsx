import { LoadingSkeleton } from '@components/Loading';

const AdminCategoryTableRowActionsSkeleton = () => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <LoadingSkeleton className="h-8 w-8" />
      <LoadingSkeleton className="h-8 w-8" />
    </div>
  );
};

export default AdminCategoryTableRowActionsSkeleton;
