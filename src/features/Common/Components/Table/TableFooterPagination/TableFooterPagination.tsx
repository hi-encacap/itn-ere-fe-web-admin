import { useTranslation } from 'react-i18next';
import { BiChevronRight } from 'react-icons/bi';

import { TablePaginationType } from '@interfaces/Common/commonTypes';

export interface TableFooterPaginationProps extends Partial<TablePaginationType> {
  onChangePageIndex: (page: number) => void;
}

const TableFooterPagination = ({
  page = 0,
  totalPages = 1,
  onChangePageIndex,
}: TableFooterPaginationProps) => {
  const { t } = useTranslation(['common'], {
    keyPrefix: 'table.pagination',
  });

  const handleChangePage = (page: number) => {
    onChangePageIndex(page);
  };

  const handleClickPrevButton = () => {
    handleChangePage(page - 1);
  };

  const handleClickNextButton = () => {
    handleChangePage(Number(page) + 1);
  };

  return (
    <nav className="relative z-0 mx-auto inline-flex rounded-md shadow-sm">
      <button
        className="relative inline-flex items-center rounded-l-md border border-gray-100 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        disabled={page === 0}
        type="button"
        onClick={handleClickPrevButton}
      >
        <span className="sr-only">{t('previous')}</span>
        <BiChevronRight size={20} className="rotate-180" />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          className={`relative inline-flex cursor-pointer items-center border px-4 py-2 text-sm font-medium ${
            index === page
              ? 'border-primary-700 bg-primary-50 text-primary-700 relative z-10'
              : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
          }`}
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => handleChangePage(index)}
        >
          {index + 1}
        </div>
      ))}
      <button
        className="relative inline-flex cursor-pointer items-center rounded-r-md border border-gray-100 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-default disabled:opacity-50"
        disabled={page === totalPages - 1}
        type="button"
        onClick={handleClickNextButton}
      >
        <span className="sr-only">{t('next')}</span>
        <BiChevronRight size={20} />
      </button>
    </nav>
  );
};

export default TableFooterPagination;
