import { SelectOptionItemType } from '@interfaces/Common/elementTypes';

import SelectOptionDropdownItem from './SelectOptionDropdownItem';

type OptionValueType = SelectOptionItemType['value'];

export interface SelectOptionDropdownProps {
  options: SelectOptionItemType[];
  value?: OptionValueType;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (value: OptionValueType) => void;
}

const SelectOptionDropdown = ({ value, options, onFocus, onBlur, onChange }: SelectOptionDropdownProps) => {
  return (
    <div
      className="absolute left-0 right-0 top-14 z-10 rounded-md bg-white py-2 shadow-center"
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
    >
      {options.map((option) => (
        <SelectOptionDropdownItem
          key={option.value}
          isSelected={option.value === value}
          {...option}
          onClick={onChange}
        />
      ))}
    </div>
  );
};

export default SelectOptionDropdown;
