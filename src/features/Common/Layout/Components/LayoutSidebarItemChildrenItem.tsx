import { cloneElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { SidebarItemType } from "@interfaces/Common/commonTypes";

interface LayoutSidebarItemChildrenItemProps {
  item: SidebarItemType;
}

const LayoutSidebarItemChildrenItem = ({ item }: LayoutSidebarItemChildrenItemProps) => {
  const { pathname } = useLocation();

  const isActive = pathname === item.to;

  return (
    <Link
      to={item.to}
      className={twMerge(
        "flex items-center justify-start space-x-4 rounded-md py-2 pl-9 pr-4 hover:bg-gray-100",
        isActive && "bg-gray-100",
      )}
    >
      {cloneElement(item.icon, {
        className: "flex-shrink-0 w-4.5 h-4.5",
      })}
      <div className="line-clamp-1">{item.label}</div>
    </Link>
  );
};

export default LayoutSidebarItemChildrenItem;
