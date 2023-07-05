import { nanoid } from "nanoid";
import { ReactNode, memo, useMemo } from "react";
import { BiChevronRight } from "react-icons/bi";
import { Tooltip } from "react-tooltip";

interface CategorySelectorNameProps {
  name: string;
  tooltip?: ReactNode;
}

const CategorySelectorNameItem = ({ name, tooltip }: CategorySelectorNameProps) => {
  const id = useMemo(() => nanoid(), []);

  return (
    <>
      <div className="flex items-center text-slate-400">
        <span className="line-clamp-1 max-w-[72px] whitespace-normal break-all" data-tooltip-id={id}>
          {name}
        </span>
        <BiChevronRight className="ml-1.5 flex-shrink-0" />
      </div>
      <Tooltip id={id}>{tooltip ?? name}</Tooltip>
    </>
  );
};

export default memo(CategorySelectorNameItem);
