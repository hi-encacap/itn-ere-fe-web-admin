import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';

const AUTHENTICATION_PATH = {
  LOGIN_PATH: '/auth/login',
};

const ADMIN_PATH = {
  HOME_PATH: '/admin',
  CATEGORY_PATH: '/admin/categories',
  CONTACT_PATH: '/admin/contacts',

  ESTATE_PATH: '/admin/estates',
  ESTATE_CREATE_PATH: '/admin/estates?action=create',
  ESTATE_PROPERTY_PATH: '/admin/estates/properties',
  ESTATE_MODIFICATION_PATH: (id: number, status = ESTATE_STATUS_ENUM.DRAFT) =>
    `/admin/estates?action=modification&id=${id}&status=${status}`,

  LOCATION_PATH: '/admin/locations',
  LOCATION_PROVINCE_PATH: '/admin/locations/provinces',
  LOCATION_DISTRICT_PATH: '/admin/locations/districts',
  LOCATION_WARD_PATH: '/admin/locations/wards',
  LOCATION_ADDRESS_BOOK_PATH: '/admin/locations/address-books',
};

const ERROR_PATH = {
  UNKNOWN_PATH: '/error/unknown',
};

export { ADMIN_PATH, AUTHENTICATION_PATH, ERROR_PATH };
