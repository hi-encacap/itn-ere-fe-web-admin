import { useTranslation } from "react-i18next";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsShieldCheck, BsShieldLock } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";

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
    {
      key: "userAndPermission",
      icon: <HiOutlineUserGroup size={20} />,
      label: t("userAndPermission"),
      to: ROOT_PATH.USER_AND_PERMISSION_PATH,
      children: [
        {
          key: "user",
          icon: <AiOutlineUser size={20} />,
          label: t("user"),
          to: ROOT_PATH.USER_AND_PERMISSION_USER_PATH,
        },
        {
          key: "role",
          icon: <BsShieldCheck size={20} />,
          label: t("role"),
          to: ROOT_PATH.USER_AND_PERMISSION_ROLE_PATH,
        },
        {
          key: "permission",
          icon: <BsShieldLock size={20} />,
          label: t("permission"),
          to: ROOT_PATH.USER_AND_PERMISSION_PERMISSION_PATH,
        },
      ],
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
