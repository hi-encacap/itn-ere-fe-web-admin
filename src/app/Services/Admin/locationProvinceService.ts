import { ADMIN_LOCATION_API_PATH } from '@constants/apis';
import {
  LocationProvinceWebsiteDataType,
  LocationProvinceWebsiteFormDataType,
} from '@interfaces/Admin/locationTypes';
import { BaseGetListQueryType, ResponseWithMetaType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getProvinces = async (
  query: BaseGetListQueryType,
): Promise<ResponseWithMetaType<LocationProvinceWebsiteDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.PROVINCES_PATH, {
    params: query,
  });
  return response.data;
};

const createProvince = async (
  data: LocationProvinceWebsiteFormDataType,
): Promise<LocationProvinceWebsiteDataType> => {
  const response = await axiosInstance.post(ADMIN_LOCATION_API_PATH.PROVINCES_PATH, data);
  return response.data.data;
};

const deleteProvinceByCode = async (code: string): Promise<void> => {
  await axiosInstance.delete(ADMIN_LOCATION_API_PATH.PROVINCE_PATH(code));
};

export { getProvinces, deleteProvinceByCode, createProvince };
