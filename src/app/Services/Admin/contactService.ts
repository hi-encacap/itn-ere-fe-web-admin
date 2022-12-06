import { ADMIN_CONTACT_API_PATH } from '@constants/apis';
import { BaseQueryParamsType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getContacts = async (params?: BaseQueryParamsType) => {
  const response = await axiosInstance.get(ADMIN_CONTACT_API_PATH.CONTACTS_PATH, {
    params,
  });
  return response.data;
};

export { getContacts };
