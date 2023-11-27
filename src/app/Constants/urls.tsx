import { ESTATE_STATUS_ENUM } from "@encacap-group/common/dist/re";
import { Key } from "react";

import { EstateProxyActionEnum } from "./enums";

const AUTHENTICATION_PATH = {
  LOGIN_PATH: "/auth/login",
};

const ADMIN_PATH = {
  HOME_PATH: "/admin",
  CATEGORY_PATH: "/admin/categories",
  CONTACT_PATH: "/admin/contacts",
  PRODUCT_PATH: "/admin/products",

  POST_PATH: "/admin/posts",
  POST_TAB_PATH: (tabId: Key) => `/admin/posts/${tabId}`,
  POST_DRAFT_PATH: "/admin/posts/draft",
  POST_CREATE_PATH: "/admin/posts/add",
  POST_EDIT_PATH: (id: Key, status: ESTATE_STATUS_ENUM) =>
    `/admin/posts/edit?post_id=${id}&post_status=${status}`,
  POST_MODIFICATION_PATH: (id: number, status = ESTATE_STATUS_ENUM.DRAFT) =>
    `/admin/posts/modify?id=${id}&status=${status}`,
  POST_CATEGORY_PATH: (categoryId: Key) => `/admin/posts/categories/${categoryId}`,
  POST_CATEGORY_TAB_PATH: (categoryId: Key, tabId: Key) => `/admin/posts/categories/${categoryId}/${tabId}`,

  ESTATE_PATH: "/admin/estates",
  ESTATE_CREATE_PATH: "/admin/estates?action=create",
  ESTATE_PROPERTY_PATH: "/admin/estates/properties",
  ESTATE_MODIFICATION_PATH: (id: number, status = ESTATE_STATUS_ENUM.DRAFT) =>
    `/admin/estates?action=${EstateProxyActionEnum.MODIFY}&id=${id}&status=${status}`,

  LOCATION_PATH: "/admin/locations",
  LOCATION_PROVINCE_PATH: "/admin/locations/provinces",
  LOCATION_DISTRICT_PATH: "/admin/locations/districts",
  LOCATION_WARD_PATH: "/admin/locations/wards",
  LOCATION_ADDRESS_BOOK_PATH: "/admin/locations/address-books",

  CONFIG_PATH: "/admin/configs",
  CONFIG_WEBSITE_PATH: "/admin/configs/websites",
  CONFIG_WEBSITE_HOME_PATH: "/admin/configs/websites/homes",
};

const ROOT_PATH = {
  HOME_PATH: "/root",
  CATEGORY_PATH: "/root/categories",
  USER_AND_PERMISSION_PATH: "/root/users-and-permissions",
  USER_AND_PERMISSION_USER_PATH: "/root/users-and-permissions/users",
  USER_AND_PERMISSION_ROLE_PATH: "/root/users-and-permissions/roles",
  USER_AND_PERMISSION_PERMISSION_PATH: "/root/users-and-permissions/permissions",
};

const ERROR_PATH = {
  UNKNOWN_PATH: "/error/unknown",
};

export { ADMIN_PATH, AUTHENTICATION_PATH, ERROR_PATH, ROOT_PATH };
