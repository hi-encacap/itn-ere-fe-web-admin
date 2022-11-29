import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableHeaderFilterLabelProps {
  label: string | number | boolean | ReactNode | null;
  selectedFilters: string[];
}

const TableHeaderFilterLabel = ({ label, selectedFilters }: TableHeaderFilterLabelProps) => {
  return (
    <div className="flex">
      <span className="line-clamp-1">
        <span className={twMerge(!!selectedFilters.length && 'mr-1 font-semibold')}>
          {label}
          {!!selectedFilters.length && ':'}
        </span>
        {selectedFilters.length > 0 && <span>{selectedFilters[0]}</span>}
      </span>
      {selectedFilters.length > 1 && (
        <span className="ml-2 inline-flex items-center justify-center rounded-xl bg-gray-300 px-2 pt-0.5 text-sm font-semibold">
          +{selectedFilters.length - 1}
        </span>
      )}
    </div>
  );
};

export default TableHeaderFilterLabel;
