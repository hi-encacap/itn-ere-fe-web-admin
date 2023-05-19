import { useTranslation } from "react-i18next";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

import { ROOT_PATH } from "@constants/urls";
import { SidebarItemType } from "@interfaces/Common/commonTypes";

import LayoutSidebar from "./LayoutSidebar";
import LayoutSidebarItem from "./LayoutSidebarItem";
import LayoutSidebarWebsite from "./LayoutSidebarWebsite";

const RootSidebar = () => {
  const { t } = useTranslation("common");

  const items: SidebarItemType[] = [
    {
      key: "dashboard",
      icon: <AiOutlineDashboard size={20} />,
      label: t("dashboard"),
      to: ROOT_PATH.HOME_PATH,
    },
    {
      key: "category",
      icon: <BiCategory size={20} />,
      label: t("category"),
      to: ROOT_PATH.CATEGORY_PATH,
    },
  ];

  return (
    <LayoutSidebar>
      <LayoutSidebarWebsite />
      {items.map((item) => (
        <LayoutSidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          to={item.to}
          childrenItems={item.children}
        />
      ))}
    </LayoutSidebar>
  );
};

export default RootSidebar;
