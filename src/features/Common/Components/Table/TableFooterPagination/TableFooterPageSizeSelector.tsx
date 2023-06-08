import { useCallback, useMemo } from "react";
import { BiChevronDown } from "react-icons/bi";

import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";

import { TablePaginationType } from "../../../../../app/Types/Common/commonTypes";

export interface TableFooterPageSizeSelectorProps {
  pageSize: TablePaginationType["page"];
  onChangePageSize: (pageSize: number) => void;
}

const TableFooterPageSizeSelector = ({
  pageSize: pageSizeProp = DEFAULT_PAGE_SIZE,
  onChangePageSize,
}: TableFooterPageSizeSelectorProps) => {
  const pageSizeOptions = [10, 25, 50, 100];

  const pageSize = useMemo(() => {
    if (pageSizeOptions.includes(pageSizeProp)) {
      return pageSizeProp;
    }
    return DEFAULT_PAGE_SIZE;
  }, [pageSizeProp]);

  const handleChangePageSize = useCallback(() => {
    onChangePageSize(pageSizeOptions.at(1) as number);
  }, [pageSizeOptions]);

  return (
    <div
      className="flex cursor-pointer items-center space-x-2 rounded-lg bg-gray-100 py-2 pl-4 pr-3 text-sm font-semibold duration-100 hover:bg-gray-200"
      role="button"
      tabIndex={0}
      onClick={handleChangePageSize}
    >
      <span>{pageSize}</span>
      <BiChevronDown />
    </div>
  );
};

export default TableFooterPageSizeSelector;
