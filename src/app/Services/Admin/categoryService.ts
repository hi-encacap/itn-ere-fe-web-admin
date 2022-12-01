import { omit } from 'lodash';

import { ADMIN_CATEGORY_API_PATH } from '@constants/apis';
import { CategoryDataType } from '@interfaces/Admin/categoryTypes';
import { BaseQueryParamsType, ResponseWithMetaType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getCategories = async (
  params?: BaseQueryParamsType,
): Promise<ResponseWithMetaType<CategoryDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH, {
    params,
  });

  return response.data;
};

const getAllCategories = async (params?: BaseQueryParamsType): Promise<CategoryDataType[]> => {
  const response = await getCategories(omit(params, 'page', 'limit'));

  return response.data;
};

const deleteCategoryByCode = async (code: string): Promise<void> => {
  await axiosInstance.delete(`${ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH}/${code}`);
};

export { getCategories, getAllCategories, deleteCategoryByCode };
