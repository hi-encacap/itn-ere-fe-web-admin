import { useTranslation } from "react-i18next";
import { AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { MdDisplaySettings } from "react-icons/md";
import { TbNews } from "react-icons/tb";

import { ADMIN_PATH } from "@constants/urls";
import { SidebarItemType } from "@interfaces/Common/commonTypes";

import LayoutSidebar from "./LayoutSidebar";
import LayoutSidebarItem from "./LayoutSidebarItem";
import LayoutSidebarWebsite from "./LayoutSidebarWebsite";

const AdminSidebar = () => {
  const { t } = useTranslation();

  const items: SidebarItemType[] = [
    {
      key: "dashboard",
      icon: <AiOutlineDashboard size={20} />,
      label: t("dashboard"),
      to: ADMIN_PATH.HOME_PATH,
    },
    {
      key: "category",
      icon: <BiCategory size={20} />,
      label: t("category"),
      to: ADMIN_PATH.CATEGORY_PATH,
    },
    {
      key: "contact",
      icon: <FiUsers size={20} />,
      label: t("contact"),
      to: ADMIN_PATH.CONTACT_PATH,
    },
    {
      key: "post",
      icon: <TbNews size={20} />,
      label: t("post"),
      to: ADMIN_PATH.POST_PATH,
    },
    // {
    //   key: "estate",
    //   icon: <MdOutlineHomeWork size={20} />,
    //   label: t("estate"),
    //   to: ADMIN_PATH.ESTATE_PATH,
    //   children: [
    //     {
    //       key: "estate_list",
    //       icon: <MdOutlineRealEstateAgent size={18} />,
    //       label: t("estateList"),
    //       to: ADMIN_PATH.ESTATE_PATH,
    //     },
    //     {
    //       key: "estate_property",
    //       icon: <TbListDetails size={18} />,
    //       label: t("estateProperty"),
    //       to: ADMIN_PATH.ESTATE_PROPERTY_PATH,
    //     },
    //   ],
    // },
    // {
    //   key: "location",
    //   icon: <HiOutlineMap size={20} />,
    //   label: t("location"),
    //   to: ADMIN_PATH.LOCATION_PATH,
    //   children: [
    //     {
    //       key: "location_province",
    //       icon: <FiMapPin size={18} />,
    //       label: t("province"),
    //       to: ADMIN_PATH.LOCATION_PROVINCE_PATH,
    //     },
    //     {
    //       key: "location_district",
    //       icon: <FiMapPin size={18} />,
    //       label: t("district"),
    //       to: ADMIN_PATH.LOCATION_DISTRICT_PATH,
    //     },
    //     {
    //       key: "location_ward",
    //       icon: <FiMapPin size={18} />,
    //       label: t("ward"),
    //       to: ADMIN_PATH.LOCATION_WARD_PATH,
    //     },
    //     {
    //       key: "location_address_book",
    //       icon: <TbMap2 size={18} />,
    //       label: t("addressBook"),
    //       to: ADMIN_PATH.LOCATION_ADDRESS_BOOK_PATH,
    //     },
    //   ],
    // },
    {
      key: "config",
      icon: <AiOutlineSetting size={20} />,
      label: t("config"),
      to: ADMIN_PATH.CONFIG_PATH,
      children: [
        {
          key: "site_config",
          icon: <MdDisplaySettings size={18} />,
          label: t("siteConfig"),
          to: ADMIN_PATH.CONFIG_SITE_PATH,
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

export default AdminSidebar;
