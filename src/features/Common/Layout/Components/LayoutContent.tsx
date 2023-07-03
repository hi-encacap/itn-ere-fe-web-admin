import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import LayoutContentTab from "./LayoutContentTab";
import { LayoutContentTabItemType } from "./LayoutContentTabItem";

interface LayoutContentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  defaultSelectedTab?: LayoutContentTabItemType["id"];
  isBlank?: boolean;
  isShowHeader?: boolean;
  tabs?: LayoutContentTabItemType[];
  className?: string;
  headerClassName?: string;
  onChangeTab?: (id: LayoutContentTabItemType["id"]) => void;
}

const LayoutContent = ({
  title,
  subtitle,
  children,
  className,
  action,
  isBlank = false,
  isShowHeader = true,
  tabs,
  defaultSelectedTab,
  headerClassName,
  onChangeTab,
}: LayoutContentProps) => {
  return (
    <div className={twMerge("px-8", className)}>
      {isShowHeader && (
        <div className={twMerge("flex h-18 items-center justify-between", headerClassName)}>
          <div>
            <div className="font-semibold">{title}</div>
            {subtitle && <div className="text-gray-500">{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      {tabs?.length && (
        <LayoutContentTab tabs={tabs} defaultTab={defaultSelectedTab} onChangeTab={onChangeTab} />
      )}
      {isBlank && children}
      {!isBlank && (
        <div
          className={twMerge(
            "relative z-0 rounded-lg border-2 border-gray-100 p-6",
            tabs?.length && "rounded-t-none",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default LayoutContent;
