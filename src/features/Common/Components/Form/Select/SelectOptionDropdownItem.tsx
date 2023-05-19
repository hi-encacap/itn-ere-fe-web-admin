import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { SelectOptionItemType } from "@interfaces/Common/elementTypes";

interface SelectOptionDropdownItemProps extends SelectOptionItemType {
  isSelected?: boolean;
  onClick: (value: SelectOptionItemType["value"]) => void;
}

const SelectOptionDropdownItem = ({
  value,
  label,
  disabled,
  isSelected,
  onClick,
}: SelectOptionDropdownItemProps) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (!disabled) {
        onClick(value);
      }
    },
    [value, disabled, onClick],
  );

  return (
    <div
      className={twMerge(
        "px-4 py-2 hover:bg-gray-100",
        isSelected && "bg-teal-500 text-white hover:bg-teal-500",
      )}
      tabIndex={-1}
      role="button"
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default SelectOptionDropdownItem;
