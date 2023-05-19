import { ADMIN_CATEGORY_GROUP_API_PATH } from "@constants/apis";
import { CategoryGroupDataType } from "@interfaces/Admin/categoryGroupTypes";

import axiosInstance from "@utils/Http/axiosInstance";

const getCategoryGroups = async (): Promise<CategoryGroupDataType[]> => {
  const response = await axiosInstance.get(ADMIN_CATEGORY_GROUP_API_PATH.CATEGORY_GROUPS_PATH);

  return response.data.data;
};

export { getCategoryGroups };
