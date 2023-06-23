import { ADMIN_WEBSITE_API_PATH } from "@constants/apis";
import { WebsiteFormDataType } from "@interfaces/Admin/websiteTypes";
import axiosInstance from "@utils/Http/axiosInstance";

const updateMyWebsite = async (data: WebsiteFormDataType) => {
  const response = await axiosInstance.put(ADMIN_WEBSITE_API_PATH.WEBSITE_ME_PATH, data);

  return response.data;
};

export { updateMyWebsite };
