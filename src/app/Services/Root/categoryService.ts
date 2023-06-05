import { IBaseListQuery, IResponseWithMeta } from "@encacap-group/common/dist/base";
import { ICategory } from "@encacap-group/common/dist/re";
import { omit } from "lodash";
import { Key } from "react";

import { ROOT_CATEGORY_API_PATH } from "@constants/apis";
import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import axiosInstance from "@utils/Http/axiosInstance";

const getCategories = async (params?: IBaseListQuery): Promise<IResponseWithMeta<ICategory[]>> => {
  const response = await axiosInstance.get(ROOT_CATEGORY_API_PATH.CATEGORIES_PATH, {
    params,
  });

  return response.data;
};

const getAllCategories = async (params?: IBaseListQuery): Promise<ICategory[]> => {
  const response = await getCategories(omit(params, "page", "limit"));

  return response.data;
};

const createCategory = async (data: CategoryFormDataType): Promise<ICategory> => {
  const response = await axiosInstance.post(ROOT_CATEGORY_API_PATH.CATEGORIES_PATH, {
    ...data,
    code: data.name,
    thumbnailId: data.thumbnail?.id,
  });

  return response.data.data;
};

const updateCategoryByCode = async (id: Key, data: CategoryFormDataType): Promise<ICategory> => {
  const response = await axiosInstance.put(ROOT_CATEGORY_API_PATH.CATEGORY_PATH(id), {
    thumbnailId: data.thumbnail?.id,
  });

  return response.data.data;
};

const deleteCategoryByCode = async (id: Key): Promise<void> => {
  await axiosInstance.delete(ROOT_CATEGORY_API_PATH.CATEGORY_PATH(id));
};

export { createCategory, deleteCategoryByCode, getAllCategories, getCategories, updateCategoryByCode };
