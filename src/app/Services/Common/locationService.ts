import { LOCATION_API_PATH } from '@constants/apis';

import axiosInstance from '@utils/Http/axiosInstance';

const getGHNProvinces = async (): Promise<Array<Record<'id' | 'name', unknown>>> => {
  const response = await axiosInstance.get(LOCATION_API_PATH.GHN_PROVINCES_PATH);
  return response.data.data;
};

const getGHNDistricts = async (provinceId: number): Promise<Array<Record<'id' | 'name', unknown>>> => {
  const response = await axiosInstance.get(LOCATION_API_PATH.GHN_DISTRICTS_PATH, {
    params: { provinceId },
  });
  return response.data.data;
};

export { getGHNProvinces, getGHNDistricts };
