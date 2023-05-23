import { twMerge } from "tailwind-merge";

import LayoutContentTab from "./LayoutContentTab";
import { LayoutContentTabItemType } from "./LayoutContentTabItem";

interface LayoutContentProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  defaultSelectedTab?: LayoutContentTabItemType["id"];
  isBlank?: boolean;
  tabs?: LayoutContentTabItemType[];
  onChangeTab?: (id: LayoutContentTabItemType["id"]) => void;
}

const LayoutContent = ({
  title,
  children,
  actions,
  isBlank = false,
  tabs,
  defaultSelectedTab,
  onChangeTab,
}: LayoutContentProps) => {
  return (
    <div className="px-8">
      <div className="flex h-18 items-center justify-between">
        <div className="font-semibold">{title}</div>
        {actions}
      </div>
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
