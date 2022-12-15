import { ADMIN_LOCATION_API_PATH } from '@constants/apis';
import { LocationProvinceWebsiteDataType } from '@interfaces/Admin/locationTypes';
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

const deleteProvinceByCode = async (code: string): Promise<void> => {
  await axiosInstance.delete(ADMIN_LOCATION_API_PATH.PROVINCE_PATH(code));
};

export { getProvinces, deleteProvinceByCode };
