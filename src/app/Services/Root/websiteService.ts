import { IBaseListQuery, IResponseWithMeta } from "@encacap-group/common/dist/base";
import { IWebsite } from "@encacap-group/common/dist/re";
import { omit } from "lodash";

import { ROOT_WEBSITE_API_PATH } from "@constants/apis";
import axiosInstance from "@utils/Http/axiosInstance";

const getWebsites = async (query?: IBaseListQuery): Promise<IResponseWithMeta<IWebsite[]>> => {
  const response = await axiosInstance.get(ROOT_WEBSITE_API_PATH.WEBSITES_PATH, {
    params: query,
  });

  return response.data;
};

const getAllWebsites = async (query?: IBaseListQuery) => {
  const response = await getWebsites(omit(query, "page", "limit"));

  return response.data;
};

export { getAllWebsites, getWebsites };
