import { omit } from 'lodash';

import { ADMIN_CATEGORY_API_PATH } from '@constants/apis';
import { CategoryDataType, CategoryFormDataType } from '@interfaces/Admin/categoryTypes';
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

const createCategory = async (data: CategoryFormDataType): Promise<CategoryDataType> => {
  const response = await axiosInstance.post(ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH, {
    ...data,
    code: data.name,
    thumbnailId: data.thumbnail?.id,
  });

  return response.data.data;
};

const updateCategoryByCode = async (code: string, data: CategoryFormDataType): Promise<CategoryDataType> => {
  const response = await axiosInstance.put(ADMIN_CATEGORY_API_PATH.CATEGORY_PATH(code), data);

  return response.data.data;
};

const deleteCategoryByCode = async (code: string): Promise<void> => {
  await axiosInstance.delete(`${ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH}/${code}`);
};

export { getCategories, getAllCategories, createCategory, updateCategoryByCode, deleteCategoryByCode };
