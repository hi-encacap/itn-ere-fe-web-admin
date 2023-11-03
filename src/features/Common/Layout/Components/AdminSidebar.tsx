import { ICategory } from "@encacap-group/common/dist/re";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FiMapPin, FiUsers } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";
import { LuListTree } from "react-icons/lu";
import { MdDisplaySettings, MdOutlineHomeWork, MdOutlineRealEstateAgent } from "react-icons/md";
import { TbListDetails, TbMap2, TbNews } from "react-icons/tb";

import { ADMIN_PATH } from "@constants/urls";
import usePermission from "@hooks/usePermission";
import useToast from "@hooks/useToast";
import { SidebarItemType } from "@interfaces/Common/commonTypes";
import { adminCategoryService } from "@services/index";

import AdminSidebarCategoryIcon from "./AdminSidebarCategoryIcon";
import LayoutSidebar from "./LayoutSidebar";
import LayoutSidebarItem from "./LayoutSidebarItem";
import LayoutSidebarWebsite from "./LayoutSidebarWebsite";

const AdminSidebar = () => {
  const { t } = useTranslation();

  const [rootCategories, setRootCategories] = useState<ICategory[]>([]);
  const [isGettingRootCategories, setIsGettingRootCategories] = useState<boolean>(true);
  const {
    RE_CATEGORY_VIEW,
    RE_CATEGORY_MODIFY,
    RE_CATEGORY_DELETE,
    RE_CONTACT_VIEW,
    RE_NEWS_VIEW_COMPLETED,
    RE_ESTATE_VIEW,
    RE_LOCATION_PROVINCE_VIEW,
    RE_LOCATION_DISTRICT_VIEW,
    RE_LOCATION_WARD_VIEW,
    RE_LOCATION_ADDRESS_VIEW,
    RE_WEBSITE_CONFIG_VIEW,
  } = usePermission();

  const toast = useToast();
  const categoryChildrenItems: SidebarItemType[] = useMemo(
    () => [
      {
        key: "category_none",
        icon: <LuListTree size={20} />,
        label: t("allPosts"),
        to: ADMIN_PATH.POST_PATH,
      },
      ...rootCategories.map((category) => ({
        key: `category_id_${Number(category.id)}`,
        icon: <AdminSidebarCategoryIcon name={category.name} />,
        label: category.name,
        to: ADMIN_PATH.POST_CATEGORY_PATH(category.id),
      })),
    ],
    [rootCategories, t],
  );

  const items: SidebarItemType[] = useMemo(
    () =>
      [
        {
          key: "dashboard",
          icon: <AiOutlineDashboard size={20} />,
          label: t("dashboard"),
          to: ADMIN_PATH.HOME_PATH,
        },
        (RE_CATEGORY_VIEW || RE_CATEGORY_MODIFY || RE_CATEGORY_DELETE) && {
          key: "category",
          icon: <BiCategory size={20} />,
          label: t("category"),
          to: ADMIN_PATH.CATEGORY_PATH,
        },
        RE_CONTACT_VIEW && {
          key: "contact",
          icon: <FiUsers size={20} />,
          label: t("contact"),
          to: ADMIN_PATH.CONTACT_PATH,
        },
        RE_NEWS_VIEW_COMPLETED && {
          key: "post",
          icon: <TbNews size={20} />,
          label: t("post"),
          to: ADMIN_PATH.POST_PATH,
          isLoading: isGettingRootCategories,
          children: categoryChildrenItems,
        },
        (RE_LOCATION_PROVINCE_VIEW ||
          RE_LOCATION_DISTRICT_VIEW ||
          RE_LOCATION_WARD_VIEW ||
          RE_LOCATION_ADDRESS_VIEW) && {
          key: "location",
          icon: <HiOutlineMap size={20} />,
          label: t("location"),
          to: ADMIN_PATH.LOCATION_PATH,
          children: [
            {
              key: "location_province",
              icon: <FiMapPin size={18} />,
              label: t("province"),
              to: ADMIN_PATH.LOCATION_PROVINCE_PATH,
            },
            {
              key: "location_district",
              icon: <FiMapPin size={18} />,
              label: t("district"),
              to: ADMIN_PATH.LOCATION_DISTRICT_PATH,
            },
            {
              key: "location_ward",
              icon: <FiMapPin size={18} />,
              label: t("ward"),
              to: ADMIN_PATH.LOCATION_WARD_PATH,
            },
            {
              key: "location_address_book",
              icon: <TbMap2 size={18} />,
              label: t("addressBook"),
              to: ADMIN_PATH.LOCATION_ADDRESS_BOOK_PATH,
            },
          ],
        },
        RE_ESTATE_VIEW && {
          key: "estate",
          icon: <MdOutlineHomeWork size={20} />,
          label: t("estate"),
          to: ADMIN_PATH.ESTATE_PATH,
          children: [
            {
              key: "estate_list",
              icon: <MdOutlineRealEstateAgent size={18} />,
              label: t("estateList"),
              to: ADMIN_PATH.ESTATE_PATH,
            },
            {
              key: "estate_property",
              icon: <TbListDetails size={18} />,
              label: t("estateProperty"),
              to: ADMIN_PATH.ESTATE_PROPERTY_PATH,
            },
          ],
        },
        RE_WEBSITE_CONFIG_VIEW && {
          key: "config",
          icon: <AiOutlineSetting size={20} />,
          label: t("config"),
          to: ADMIN_PATH.CONFIG_PATH,
          children: [
            {
              key: "site_config",
              icon: <MdDisplaySettings size={18} />,
              label: t("siteConfig"),
              to: ADMIN_PATH.CONFIG_WEBSITE_PATH,
            },
          ],
        },
      ].filter(Boolean) as SidebarItemType[],
    [
      t,
      RE_CATEGORY_VIEW,
      RE_CATEGORY_MODIFY,
      RE_CATEGORY_DELETE,
      RE_CONTACT_VIEW,
      RE_NEWS_VIEW_COMPLETED,
      isGettingRootCategories,
      categoryChildrenItems,
      RE_ESTATE_VIEW,
      RE_LOCATION_PROVINCE_VIEW,
      RE_LOCATION_DISTRICT_VIEW,
      RE_LOCATION_WARD_VIEW,
      RE_LOCATION_ADDRESS_VIEW,
      RE_WEBSITE_CONFIG_VIEW,
    ],
  );

  const getRootCategories = useCallback(async () => {
    setIsGettingRootCategories(true);

    try {
      const response = await adminCategoryService.getAllRootCategories();
      setRootCategories(response);
    } catch (error) {
      toast.error(t("cannotGetRootCategories"));
    } finally {
      setIsGettingRootCategories(false);
    }
  }, [t, toast]);

  useEffect(() => {
    getRootCategories();
  }, [getRootCategories]);

  return (
    <LayoutSidebar>
      <LayoutSidebarWebsite />
      {items.map((item) => (
        <LayoutSidebarItem
          key={item.key}
          icon={item.icon}
          isLoading={item.isLoading}
          label={item.label}
          to={item.to}
          childrenItems={item.children}
        />
      ))}
    </LayoutSidebar>
  );
};

export default memo(AdminSidebar);
