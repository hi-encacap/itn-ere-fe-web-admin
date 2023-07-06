import { ICategory } from "@encacap-group/common/dist/re";
import { first } from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import CategorySelectorNameHiddenList from "./CategorySelectorNameHiddenList";
import CategorySelectorNameItem from "./CategorySelectorNameItem";

interface CategorySelectorNameProps {
  data: ICategory;
}

const CategorySelectorName = ({ data }: CategorySelectorNameProps) => {
  const [parentNames, setParentNames] = useState<string[]>([]);

  const firstParentName = useMemo(() => first(parentNames), [parentNames]);
  const lastParentName = useMemo(() => (parentNames.length > 1 ? parentNames.at(-1) : null), [parentNames]);
  const restParentNames = useMemo(() => parentNames.slice(1, -1), [parentNames]);

  const getParentNames = useCallback((category: ICategory): string[] => {
    const { parent } = category;
    const result: string[] = [];

    if (!parent) {
      return result;
    }

    result.push(...getParentNames(parent), parent.name);

    return result;
  }, []);

  useEffect(() => {
    setParentNames(getParentNames(data));
  }, [data, getParentNames]);

  return (
    <div className="flex w-full items-end space-x-2 overflow-hidden whitespace-nowrap">
      {firstParentName && (
        <div className="flex items-center space-x-2">
          <CategorySelectorNameItem name={firstParentName} />
          {restParentNames.length > 0 && <CategorySelectorNameHiddenList names={restParentNames} />}
          {lastParentName && <CategorySelectorNameItem name={lastParentName} />}
        </div>
      )}
      <span className="flex-shrink-0">{data.name}</span>
    </div>
  );
};

export default memo(CategorySelectorName);
