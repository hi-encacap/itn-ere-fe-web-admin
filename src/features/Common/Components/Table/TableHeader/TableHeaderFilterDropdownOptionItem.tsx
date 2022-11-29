import { useMemo } from 'react';

import { Checkbox } from '@components/Form';

import { TableFilterOptionItemType } from '../../../../../app/Types/Common/elementTypes';

interface TableHeaderFilterDropdownOptionItemProps {
  option: TableFilterOptionItemType;
  filterBy: string;
  selectedFilters: string[];
  onChange: (value: string, checked: boolean) => void;
}

const TableHeaderFilterDropdownOptionItem = ({
  option,
  filterBy,
  selectedFilters,
  onChange,
}: TableHeaderFilterDropdownOptionItemProps) => {
  const value = useMemo(() => option[filterBy], [option, filterBy]);

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    onChange(value, isChecked);
  };

  return (
    <label htmlFor={value} className="group flex items-center justify-start space-x-3 py-1">
      <Checkbox
        id={value}
        name={value}
        checked={selectedFilters.includes(value)}
        className="h-5 w-5"
        onChange={handleChangeCheckbox}
      />
      <span>{value}</span>
    </label>
  );
};

export default TableHeaderFilterDropdownOptionItem;
