import { IBaseListQuery, IResponseWithMeta } from "@encacap-group/common/dist/base";
import { ICategory } from "@encacap-group/common/dist/re";
import { omit } from "lodash";
import { Key } from "react";

import { ADMIN_CATEGORY_API_PATH } from "@constants/apis";
import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import axiosInstance from "@utils/Http/axiosInstance";

const getCategories = async (params?: IBaseListQuery): Promise<IResponseWithMeta<ICategory[]>> => {
  const response = await axiosInstance.get(ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH, {
    params: {
      expand: "categoryGroup, website, avatar, parent",
      ...params,
    },
  });

  return response.data;
};

const getAllCategories = async (params?: IBaseListQuery): Promise<ICategory[]> => {
  const response = await getCategories(omit(params, "page", "limit"));

  return response.data;
};

const getRootCategories = async (query: IBaseListQuery): Promise<IResponseWithMeta<ICategory[]>> => {
  const response = await axiosInstance.get(ADMIN_CATEGORY_API_PATH.ROOT_CATEGORIES_PATH, {
    params: query,
  });

  return response.data;
};

const getAllRootCategories = async (query?: IBaseListQuery): Promise<ICategory[]> => {
  const response = await getRootCategories(omit(query, "page", "limit"));

  return response.data;
};

const createCategory = async (data: CategoryFormDataType): Promise<ICategory> => {
  const response = await axiosInstance.post(ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH, {
    ...data,
    code: data.name,
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const updateCategoryByCode = async (id: Key, data: CategoryFormDataType): Promise<ICategory> => {
  const response = await axiosInstance.put(ADMIN_CATEGORY_API_PATH.CATEGORY_PATH(id), {
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const deleteCategoryByCode = async (id: Key): Promise<void> => {
  await axiosInstance.delete(`${ADMIN_CATEGORY_API_PATH.CATEGORIES_PATH}/${id}`);
};

export {
  createCategory,
  deleteCategoryByCode,
  getAllCategories,
  getAllRootCategories,
  getCategories,
  getRootCategories,
  updateCategoryByCode,
};
