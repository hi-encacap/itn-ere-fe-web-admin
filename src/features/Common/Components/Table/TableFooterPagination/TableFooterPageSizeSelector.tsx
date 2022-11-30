import { TablePaginationType } from '../../../../../app/Types/Common/commonTypes';

export interface TableFooterPageSizeSelectorProps {
  pageSize: TablePaginationType['page'];
  onChangePageSize: (pageSize: number) => void;
}

const TableFooterPageSizeSelector = ({ pageSize, onChangePageSize }: TableFooterPageSizeSelectorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageSizeOptions = [10, 25, 50, 100];

  return (
    <div className="flex cursor-pointer items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold duration-100 hover:bg-gray-200">
      1
    </div>
  );
};

export default TableFooterPageSizeSelector;
