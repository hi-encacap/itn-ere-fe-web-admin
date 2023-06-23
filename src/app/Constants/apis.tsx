import { Key } from "react";

const AUTHENTICATION_API_PATH = {
  LOGIN_PATH: "v1/auth/login",
  ME_PATH: "v1/auth/me",
  REFRESH_TOKEN_PATH: "v1/auth/refresh",
};

const ADMIN_CATEGORY_API_PATH = {
  CATEGORIES_PATH: "v1/admin/categories",
  ROOT_CATEGORIES_PATH: "v1/admin/categories/roots",
  CATEGORY_PATH: (id: Key) => `v1/admin/categories/${id}`,
  DELETE_CATEGORY_PATH: (id: number) => `v1/admin/categories/${id}`,
};

const ROOT_CATEGORY_API_PATH = {
  CATEGORIES_PATH: "v1/root/categories",
  CATEGORY_PATH: (id: Key) => `v1/root/categories/${id}`,
  CATEGORY_GROUPS_PATH: "v1/root/category-groups",
  CATEGORY_GROUP_PATH: (id: Key) => `v1/root/category-groups/${id}`,
};

const ADMIN_CATEGORY_GROUP_API_PATH = {
  CATEGORY_GROUPS_PATH: "v1/admin/category-groups",
};

const ADMIN_LOCATION_API_PATH = {
  PROVINCES_PATH: "v1/admin/locations/provinces",
  PROVINCE_PATH: (code: string) => `v1/admin/locations/provinces/${code}`,
  DISTRICTS_PATH: "v1/admin/locations/districts",
  DISTRICT_PATH: (code: string) => `v1/admin/locations/districts/${code}`,
  WARDS_PATH: "v1/admin/locations/wards",
  WARD_PATH: (code: string) => `v1/admin/locations/wards/${code}`,
  ADDRESS_BOOKS_PATH: "v1/admin/locations/address-books",
  ADDRESS_BOOK_PATH: (id: number) => `v1/admin/locations/address-books/${id}`,
};

const ADMIN_ESTATE_PROPERTY_API_PATH = {
  ESTATE_PROPERTIES_PATH: "v1/admin/category-properties",
  ESTATE_PROPERTY_PATH: (id: number) => `v1/admin/category-properties/${id}`,
};

const ADMIN_ESTATE_API_PATH = {
  ESTATES_PATH: "v1/admin/estates",
  ESTATE_PATH: (id: Key) => `v1/admin/estates/${id}`,
  ESTATE_UN_PUBLISH_PATH: (id: Key) => `v1/admin/estates/${id}/un-publish`,
  ESTATE_PUBLISH_PATH: (id: Key) => `v1/admin/estates/${id}/publish`,
  ESTATE_MOVE_TO_TOP_PATH: (id: Key) => `v1/admin/estates/${id}/up-top`,
  ESTATE_DRAFTS_PATH: "v1/admin/estate-drafts",
  ESTATE_DRAFT_PATH: (id: Key) => `v1/admin/estate-drafts/${id}`,
};

const ADMIN_POST_API_PATH = {
  POSTS_PATH: "v1/admin/posts",
  POST_PATH: (id: Key) => `v1/admin/posts/${id}`,
  POST_UN_PUBLISH_PATH: (id: Key) => `v1/admin/posts/${id}/un-publish`,
  POST_PUBLISH_PATH: (id: Key) => `v1/admin/posts/${id}/publish`,
  POST_MOVE_TO_TOP_PATH: (id: Key) => `v1/admin/posts/${id}/up-top`,
  POST_DRAFTS_PATH: "v1/admin/post-drafts",
  POST_DRAFT_PATH: (id: Key) => `v1/admin/post-drafts/${id}`,
};

const ADMIN_CONFIG_API_PATH = {
  CONFIGS_PATH: "v1/admin/website-configs",
  CONFIG_PATH: (id: Key) => `v1/admin/website-configs/${id}`,
};

const LOCATION_API_PATH = {
  GHN_PROVINCES_PATH: "v1/locations/ghn/provinces",
  GHN_DISTRICTS_PATH: "v1/locations/ghn/districts",
  GHN_WARDS_PATH: "v1/locations/ghn/wards",
};

const ADMIN_CONTACT_API_PATH = {
  CONTACTS_PATH: "/admin/contacts",
  CONTACT_PATH: (id: number) => `/admin/contacts/${id}`,
};

const UPLOAD_API_PATH = {
  UPLOAD_IMAGE_PATH: "v1/images/single",
};

const UNIT_PRICE_API_PATH = {
  UNIT_PRICES_PATH: "v1/unit-prices",
};

const ESTATE_QUARTER_API_PATH = {
  ESTATE_QUARTERS_PATH: "v1/estates/estate-quarters",
};

const ROOT_WEBSITE_API_PATH = {
  WEBSITES_PATH: "v1/root/websites",
  WEBSITE_PATH: (id: Key) => `v1/root/websites/${id}`,
};

const ADMIN_WEBSITE_API_PATH = {
  WEBSITE_ME_PATH: "v1/admin/websites/me",
};

const ADMIN_CONFIG_WEBSITE_API_PATH = {
  CONFIG_WEBSITES_PATH: "v1/admin/configs/websites",
  CONFIG_WEBSITE_PATH: (id: Key) => `v1/admin/configs/websites/${id}`,
};

export {
  ADMIN_CATEGORY_API_PATH,
  ADMIN_CATEGORY_GROUP_API_PATH,
  ADMIN_CONFIG_API_PATH,
  ADMIN_CONFIG_WEBSITE_API_PATH,
  ADMIN_CONTACT_API_PATH,
  ADMIN_ESTATE_API_PATH,
  ADMIN_ESTATE_PROPERTY_API_PATH,
  ADMIN_LOCATION_API_PATH,
  ADMIN_POST_API_PATH,
  ADMIN_WEBSITE_API_PATH,
  AUTHENTICATION_API_PATH,
  ESTATE_QUARTER_API_PATH,
  LOCATION_API_PATH,
  ROOT_CATEGORY_API_PATH,
  ROOT_WEBSITE_API_PATH,
  UNIT_PRICE_API_PATH,
  UPLOAD_API_PATH,
};
