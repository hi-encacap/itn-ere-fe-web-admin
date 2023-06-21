import { memo, useMemo } from "react";
import { BiChevronRight } from "react-icons/bi";

import CategorySelectorNameItem from "./CategorySelectorNameItem";

interface CategorySelectorNameHiddenListProps {
  names: string[];
}

const CategorySelectorNameHiddenList = ({ names }: CategorySelectorNameHiddenListProps) => {
  const length = useMemo(() => names.length, [names]);

  return (
    <CategorySelectorNameItem
      name="..."
      tooltip={
        <div className="flex items-center justify-center space-x-1">
          {names.map((name, index) => (
            // #skipcq: JS-0437
            <div key={index} className="flex items-center justify-center space-x-1 text-white">
              <span>{name}</span>
              {index < length - 1 && <BiChevronRight />}
            </div>
          ))}
        </div>
      }
    />
  );
};

export default memo(CategorySelectorNameHiddenList);
