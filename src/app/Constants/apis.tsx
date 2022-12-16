const AUTHENTICATION_API_PATH = {
  LOGIN_PATH: 'auth/login',
  ME_PATH: 'auth/me',
  REFRESH_TOKEN_PATH: 'auth/refresh',
};

const ADMIN_CATEGORY_API_PATH = {
  CATEGORIES_PATH: 'admin/categories',
  CATEGORY_PATH: (code: string) => `/admin/categories/${code}`,
  DELETE_CATEGORY_PATH: (code: string) => `/admin/categories/${code}`,
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
};

const LOCATION_API_PATH = {
  GHN_PROVINCES_PATH: 'locations/ghn/provinces',
  GHN_DISTRICTS_PATH: 'locations/ghn/districts',
};

const UPLOAD_API_PATH = {
  UPLOAD_IMAGE_PATH: 'admin/cloudflare/images/single',
};

export {
  AUTHENTICATION_API_PATH,
  ADMIN_CATEGORY_API_PATH,
  ADMIN_CATEGORY_GROUP_API_PATH,
  ADMIN_CONTACT_API_PATH,
  ADMIN_LOCATION_API_PATH,
  UPLOAD_API_PATH,
  LOCATION_API_PATH,
};
