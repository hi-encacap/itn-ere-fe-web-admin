import { useCallback, useLayoutEffect, useState } from "react";

import LayoutContentTabItem, { LayoutContentTabItemType } from "./LayoutContentTabItem";

interface LayoutContentTabProps {
  tabs: LayoutContentTabItemType[];
  defaultTab?: LayoutContentTabItemType["id"];
  onChangeTab?: (id: LayoutContentTabItemType["id"]) => void;
}

const LayoutContentTab = ({ tabs, defaultTab, onChangeTab }: LayoutContentTabProps) => {
  const [selectedTab, setSelectedTab] = useState<LayoutContentTabItemType["id"] | null>(null);

  const handleSelectTab = useCallback(
    (id: LayoutContentTabItemType["id"]) => {
      setSelectedTab(id);
      onChangeTab?.(id);
    },
    [onChangeTab],
  );

  useLayoutEffect(() => {
    if (selectedTab) {
      return;
    }

    if (defaultTab) {
      setSelectedTab(defaultTab);
      return;
    }

    setSelectedTab(tabs[0].id);
  }, [defaultTab, selectedTab, tabs]);

  return (
    <div className="relative z-10 -mb-px flex items-center justify-start space-x-2 rounded-t-lg border-2 border-gray-100 bg-gray-100">
      {tabs.map(({ id, label }) => (
        <LayoutContentTabItem
          key={id}
          id={id}
          label={label}
          isSelected={selectedTab === id}
          onSelectTab={handleSelectTab}
        />
      ))}
    </div>
  );
};

export default LayoutContentTab;
