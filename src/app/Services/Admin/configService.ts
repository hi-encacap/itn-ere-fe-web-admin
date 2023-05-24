import { IConfig } from "@encacap-group/common/dist/re";
import { Key } from "react";

import { ADMIN_CONFIG_API_PATH } from "@constants/apis";

import axiosInstance from "@utils/Http/axiosInstance";

const getConfigs = async (): Promise<IConfig[]> => {
  const response = await axiosInstance.get(ADMIN_CONFIG_API_PATH.CONFIGS_PATH);

  return response.data.data;
};

const updateConfigByCode = async (code: Key, data: Omit<Partial<IConfig>, "code">) => {
  const response = await axiosInstance.put(ADMIN_CONFIG_API_PATH.CONFIG_PATH(code), {
    code,
    ...data,
  });

  return response.data.data;
};

export { getConfigs, updateConfigByCode };
