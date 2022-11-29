import { ADMIN_CATEGORY_API_PATH } from '@constants/apis';
import { BaseQueryParamsType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getCategories = async (params?: BaseQueryParamsType) => {
  const response = await axiosInstance.get(ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH, {
    params,
  });

  return response.data.data;
};

export { getCategories };
