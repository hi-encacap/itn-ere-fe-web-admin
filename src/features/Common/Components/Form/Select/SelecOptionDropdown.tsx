import { RefObject, useEffect, useState } from 'react';

import { SelectOptionItemType } from '@interfaces/Common/elementTypes';

import SelectOptionDropdownItem from './SelectOptionDropdownItem';

type OptionValueType = SelectOptionItemType['value'];

export interface SelectOptionDropdownProps {
  options: SelectOptionItemType[];
  value?: OptionValueType;
  inputRef?: RefObject<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (value: OptionValueType) => void;
}

const SelectOptionDropdown = ({
  value,
  options,
  inputRef,
  onFocus,
  onBlur,
  onChange,
}: SelectOptionDropdownProps) => {
  const [dropdownHeight, setDropdownHeight] = useState(0);

  if (!options.length) {
    return null;
  }

  useEffect(() => {
    const inputElement = inputRef?.current;

    if (!inputElement) {
      return;
    }

    const inputPosition = inputElement.getBoundingClientRect();
    const screenPosition = window.screen.availHeight;

    const dropdownHeight = screenPosition - inputPosition.bottom - 120;

    setDropdownHeight(dropdownHeight);
  }, [inputRef]);

  return (
    <div
      className="overflow-overlay absolute -left-0.5 -right-0.5 top-14 z-10 rounded-md bg-white py-2 shadow-center"
      style={{ maxHeight: dropdownHeight }}
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
