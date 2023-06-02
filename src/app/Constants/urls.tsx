import { ESTATE_STATUS_ENUM } from "@encacap-group/common/dist/re";

import { ESTATE_PROXY_ACTION_ENUM } from "./enums";

const AUTHENTICATION_PATH = {
  LOGIN_PATH: "/auth/login",
};

const ADMIN_PATH = {
  HOME_PATH: "/admin",
  CATEGORY_PATH: "/admin/categories",
  CONTACT_PATH: "/admin/contacts",

  POST_PATH: "/admin/posts",
  POST_DRAFT_PATH: "/admin/posts/draft",
  POST_CREATE_PATH: "/admin/posts/add",
  POST_MODIFICATION_PATH: (id: number, status = ESTATE_STATUS_ENUM.DRAFT) =>
    `/admin/posts/modify?id=${id}&status=${status}`,

  ESTATE_PATH: "/admin/estates",
  ESTATE_CREATE_PATH: "/admin/estates?action=create",
  ESTATE_PROPERTY_PATH: "/admin/estates/properties",
  ESTATE_MODIFICATION_PATH: (id: number, status = ESTATE_STATUS_ENUM.DRAFT) =>
    `/admin/estates?action=${ESTATE_PROXY_ACTION_ENUM.MODIFY}&id=${id}&status=${status}`,

  LOCATION_PATH: "/admin/locations",
  LOCATION_PROVINCE_PATH: "/admin/locations/provinces",
  LOCATION_DISTRICT_PATH: "/admin/locations/districts",
  LOCATION_WARD_PATH: "/admin/locations/wards",
  LOCATION_ADDRESS_BOOK_PATH: "/admin/locations/address-books",

  CONFIG_PATH: "/admin/configs",
  CONFIG_SITE_PATH: "/admin/configs/site",
};

const ROOT_PATH = {
  HOME_PATH: "/root",

  CATEGORY_PATH: "/root/categories",
};

const ERROR_PATH = {
  UNKNOWN_PATH: "/error/unknown",
};

export { ADMIN_PATH, AUTHENTICATION_PATH, ERROR_PATH, ROOT_PATH };
