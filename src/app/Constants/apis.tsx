const AUTHENTICATION_API_PATH = {
  LOGIN_PATH: 'auth/login',
  ME_PATH: 'auth/me',
  REFRESH_TOKEN_PATH: 'auth/refresh',
};

const ADMIN_CATEGORY_API_PATH = {
  CATEGORIES_PATH: 'admin/categories',
  CATEGORY_PATH: (id: number) => `/admin/categories/${id}`,
  DELETE_CATEGORY_PATH: (id: number) => `/admin/categories/${id}`,
};

const ADMIN_CATEGORY_GROUP_API_PATH = {
  CATEGORY_GROUPS_PATH: 'admin/category-groups',
};

const ADMIN_CONTACT_API_PATH = {
  CONTACTS_PATH: 'admin/contacts',
  CONTACT_PATH: (id: number) => `/admin/contacts/${id}`,
};

const ADMIN_LOCATION_API_PATH = {
  PROVINCES_PATH: 'admin/locations/provinces',
  PROVINCE_PATH: (code: string) => `/admin/locations/provinces/${code}`,
  DISTRICTS_PATH: 'admin/locations/districts',
  DISTRICT_PATH: (code: string) => `/admin/locations/districts/${code}`,
  WARDS_PATH: 'admin/locations/wards',
  WARD_PATH: (code: string) => `/admin/locations/wards/${code}`,
  ADDRESS_BOOKS_PATH: 'admin/locations/address-books',
  ADDRESS_BOOK_PATH: (id: number) => `/admin/locations/address-books/${id}`,
};

const ADMIN_ESTATE_PROPERTY_API_PATH = {
  ESTATE_PROPERTIES_PATH: 'admin/category-properties',
  ESTATE_PROPERTY_PATH: (id: number) => `admin/category-properties/${id}`,
};

const ADMIN_ESTATE_API_PATH = {
  ESTATES_PATH: 'admin/estates',
  ESTATE_PATH: (id: number) => `/admin/estates/${id}`,
};

const LOCATION_API_PATH = {
  GHN_PROVINCES_PATH: 'locations/ghn/provinces',
  GHN_DISTRICTS_PATH: 'locations/ghn/districts',
  GHN_WARDS_PATH: 'locations/ghn/wards',
};

const UPLOAD_API_PATH = {
  UPLOAD_IMAGE_PATH: 'admin/cloudflare/images/single',
};

const UNIT_PRICE_API_PATH = {
  UNIT_PRICES_PATH: 'unit-prices',
};

const ESTATE_QUARTER_API_PATH = {
  ESTATE_QUARTERS_PATH: 'estate-quarters',
};

export {
  AUTHENTICATION_API_PATH,
  ADMIN_CATEGORY_API_PATH,
  ADMIN_CATEGORY_GROUP_API_PATH,
  ADMIN_CONTACT_API_PATH,
  ADMIN_LOCATION_API_PATH,
  ADMIN_ESTATE_PROPERTY_API_PATH,
  ADMIN_ESTATE_API_PATH,
  UPLOAD_API_PATH,
  LOCATION_API_PATH,
  UNIT_PRICE_API_PATH,
  ESTATE_QUARTER_API_PATH,
};
