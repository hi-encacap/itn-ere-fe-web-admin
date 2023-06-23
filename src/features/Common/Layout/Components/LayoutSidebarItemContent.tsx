import { cloneElement, ReactElement } from "react";
import { BiChevronRight } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import LoadingSpinner from "@components/Loading/LoadingSpinner";

interface LayoutSidebarItemContentProps {
  className?: string;
  icon: ReactElement;
  isActive: boolean;
  isLoading?: boolean;
  isShowChildren: boolean;
  hasChildren: boolean;
  label: string;
}

const LayoutSidebarItemContent = ({
  className,
  isActive,
  isLoading,
  isShowChildren,
  icon,
  label,
  hasChildren,
}: LayoutSidebarItemContentProps) => {
  return (
    <div
      className={twMerge(
        "relative cursor-pointer rounded-md px-5 py-2.5 duration-100 hover:bg-gray-100",
        className,
        (isActive || isShowChildren) && "bg-gray-100",
      )}
    >
      {isActive && <div className="absolute left-0 top-3 h-5 w-1 rounded-r-sm bg-teal-500" />}
      <div className="flex items-center justify-start space-x-4">
        {cloneElement(icon, {
          className: twMerge("w-5 h-5 block flex-shrink-0", (isActive || isShowChildren) && "text-teal-500"),
        })}
        <div className={twMerge("flex-1", (isActive || isShowChildren) && "text-teal-500")}>{label}</div>
        {hasChildren && !isLoading && (
          <div
            className={twMerge(
              "absolute right-3 flex flex-shrink-0 items-center justify-center duration-100",
              (isActive || isShowChildren) && "text-teal-500",
              isShowChildren && "rotate-90 transform",
            )}
          >
            <BiChevronRight size={20} />
          </div>
        )}
        {isLoading && (
          <div className="absolute right-3">
            <LoadingSpinner className="h-4 w-4 border-teal-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutSidebarItemContent;
