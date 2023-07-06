import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { ACB_CONFIG_CODE_ENUM, CONFIG_TYPE_ENUM, IWebsiteConfig } from "@encacap-group/common/dist/re";
import { camelCase, kebabCase } from "lodash";
import Queue from "queue";
import { Key } from "react";

import { ADMIN_CONFIG_WEBSITE_API_PATH } from "@constants/apis";
import { WebsiteConfigFormDataType } from "@interfaces/Admin/websiteConfigTypes";
import axiosInstance from "@utils/Http/axiosInstance";

const updateWebsiteConfigByKey = async (key: Key, data: Partial<IWebsiteConfig>) => {
  const response = await axiosInstance.put(ADMIN_CONFIG_WEBSITE_API_PATH.CONFIG_WEBSITE_PATH(key), data);

  return response.data;
};

const bulkUpdateWebsiteConfig = async (data: Array<Partial<IWebsiteConfig>>) => {
  const response = await axiosInstance.put(ADMIN_CONFIG_WEBSITE_API_PATH.BULK_CONFIG_WEBSITE_PATH, {
    items: data,
  });

  return response.data;
};

const updateWebsiteContact = async (data: WebsiteConfigFormDataType) => {
  const submitData = Object.entries(data).map(([key, value]) => ({
    code: kebabCase(key),
    value,
  }));

  const queue = new Queue({ concurrency: 1 });

  submitData.forEach((item) =>
    queue.push(async () =>
      updateWebsiteConfigByKey(item.code, { value: item.value, type: CONFIG_TYPE_ENUM.PRIMITIVE }),
    ),
  );

  const response = await queue.start();

  return response;
};

const getWebsiteContact = async (): Promise<WebsiteConfigFormDataType> => {
  const {
    data: { data },
  } = await axiosInstance.get(ADMIN_CONFIG_WEBSITE_API_PATH.CONFIG_WEBSITES_PATH, {
    params: {
      codes: [
        ACB_CONFIG_CODE_ENUM.PHONE_NUMBER,
        ACB_CONFIG_CODE_ENUM.EMAIL_ADDRESS,
        ACB_CONFIG_CODE_ENUM.ADDRESS,
        ACB_CONFIG_CODE_ENUM.BANK_ACCOUNT,
        ACB_CONFIG_CODE_ENUM.TAX_NUMBER,
      ],
    },
  });

  return data.reduce((configObject: WebsiteConfigFormDataType, config: IWebsiteConfig) => {
    const key = camelCase(config.code);

    return {
      ...configObject,
      [key]: config.value,
    };
  }, {});
};

const getConfigByKey = async (key: Key) => {
  const response = await axiosInstance.get(ADMIN_CONFIG_WEBSITE_API_PATH.CONFIG_WEBSITE_PATH(key));

  return response.data.data;
};

const getConfigs = async (query: IBaseListQuery) => {
  const response = await axiosInstance.get(ADMIN_CONFIG_WEBSITE_API_PATH.CONFIG_WEBSITES_PATH, {
    params: query,
  });

  return response.data;
};

export {
  bulkUpdateWebsiteConfig,
  getConfigByKey,
  getConfigs,
  getWebsiteContact,
  updateWebsiteConfigByKey,
  updateWebsiteContact,
};
