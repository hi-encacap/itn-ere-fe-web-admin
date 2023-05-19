import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TableFooterPageSizeSelector, {
  TableFooterPageSizeSelectorProps,
} from "./TableFooterPagination/TableFooterPageSizeSelector";
import TableFooterPagination, {
  TableFooterPaginationProps,
} from "./TableFooterPagination/TableFooterPagination";
import TableFooterSkeleton from "./TableFooterSkeleton";

export type TableFooterProps = TableFooterPaginationProps &
  TableFooterPageSizeSelectorProps & {
    isLoading?: boolean;
    dataLength?: number;
  };

const TableFooter = ({
  page = 1,
  limit = 10,
  totalRows = 0,
  totalPages = 1,
  isLoading = false,
  dataLength = 0,
  onChangePageIndex: onChangePage,
  onChangePageSize,
}: TableFooterProps) => {
  const { t } = useTranslation(["common"], {
    keyPrefix: "table.pagination",
  });

  const [showingFrom, setShowingFrom] = useState(1);
  const [showingTo, setShowingTo] = useState(1);

  useEffect(() => {
    let newShowingFrom = 1;
    let newShowingTo = (Number(page) + 1) * limit;

    if (page > 0) {
      newShowingFrom = page * limit + 1;
    }

    if (newShowingTo > totalRows) {
      newShowingTo = totalRows;
    }

    setShowingFrom(newShowingFrom);
    setShowingTo(newShowingTo);
  }, [page, totalRows, limit]);

  return (
    <div className="relative mt-6 flex items-center justify-between">
      {(!isLoading || Boolean(dataLength)) && (
        <>
          <div className="flex flex-1 items-center space-x-4">
            <TableFooterPageSizeSelector pageSize={page} onChangePageSize={onChangePageSize} />
            <div>
              {t("counting", {
                from: showingFrom,
                to: showingTo,
                total: totalRows,
              })}
            </div>
          </div>
          <TableFooterPagination page={page} totalPages={totalPages} onChangePageIndex={onChangePage} />
          {isLoading && <div className="absolute inset-0 bg-white bg-opacity-50" />}
        </>
      )}
      {isLoading && !dataLength && <TableFooterSkeleton />}
    </div>
  );
};

export default TableFooter;
