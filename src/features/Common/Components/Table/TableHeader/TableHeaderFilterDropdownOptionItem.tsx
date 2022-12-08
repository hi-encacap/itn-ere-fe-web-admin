import { useCallback } from 'react';

import { Checkbox } from '@components/Form';

export interface TableFilterOptionPrivateItemType {
  value: string;
  label: string;
}

interface TableHeaderFilterDropdownOptionItemProps {
  option: TableFilterOptionPrivateItemType;
  isSelected: boolean;
  onChange: (value: string, checked: boolean) => void;
}

const TableHeaderFilterDropdownOptionItem = ({
  option: { value, label },
  isSelected = false,
  onChange,
}: TableHeaderFilterDropdownOptionItemProps) => {
  const handleChangeCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    onChange(value, isChecked);
  }, []);

  return (
    <label htmlFor={value} className="group flex items-center justify-start space-x-3 py-1">
      <Checkbox
        id={value}
        name={value}
        checked={isSelected}
        className="h-5 w-5"
        onChange={handleChangeCheckbox}
      />
      <span>{label}</span>
    </label>
  );
};

export default TableHeaderFilterDropdownOptionItem;
