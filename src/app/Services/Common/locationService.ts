import { LOCATION_API_PATH } from '@constants/apis';

import axiosInstance from '@utils/Http/axiosInstance';

const getGHNProvinces = async (): Promise<Array<Record<'ghnRefId' | 'name', unknown>>> => {
  const response = await axiosInstance.get(LOCATION_API_PATH.GHN_PROVINCES_PATH);
  return response.data.data;
};

const getGHNDistricts = async (
  provinceCode: string,
): Promise<Array<Record<'ghnRefId' | 'name', unknown>>> => {
  const response = await axiosInstance.get(LOCATION_API_PATH.GHN_DISTRICTS_PATH, {
    params: { provinceCode },
  });
  return response.data.data;
};

const getGHNWards = async (districtCode: string): Promise<Array<Record<'ghnRefId' | 'name', unknown>>> => {
  const response = await axiosInstance.get(LOCATION_API_PATH.GHN_WARDS_PATH, {
    params: { districtCode },
  });
  return response.data.data;
};

export { getGHNProvinces, getGHNDistricts, getGHNWards };
