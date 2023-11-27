import { HTMLAttributes, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BiHomeCircle } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

import LayoutSidebarItem from "@common/Layout/Components/LayoutSidebarItem";
import { ADMIN_PATH } from "@constants/urls";
import { SidebarItemType } from "@interfaces/Common/commonTypes";

type AdminConfigWebsiteSidebarProps = HTMLAttributes<HTMLDivElement>;

const AdminConfigWebsiteSidebar = ({ className }: AdminConfigWebsiteSidebarProps) => {
  const { t } = useTranslation();

  const items = useMemo<SidebarItemType[]>(
    () => [
      {
        key: "detailInfo",
        icon: <TbListDetails size={20} />,
        label: t("detailInfo"),
        to: ADMIN_PATH.CONFIG_WEBSITE_PATH,
      },
      {
        key: "home",
        icon: <BiHomeCircle size={20} />,
        label: t("home"),
        to: ADMIN_PATH.CONFIG_WEBSITE_HOME_PATH,
      },
    ],
    [t],
  );

  return (
    <div className={twMerge(className, "rounded-lg border-2 border-gray-100 px-0 py-3")}>
      {items.map((item) => (
        <LayoutSidebarItem
          key={item.key}
          icon={item.icon}
          isLoading={item.isLoading}
          label={item.label}
          to={item.to}
          childrenItems={item.children}
          itemClassName="rounded-none"
        />
      ))}
    </div>
  );
};

export default AdminConfigWebsiteSidebar;
