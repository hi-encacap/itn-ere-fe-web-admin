import { ADMIN_LOCATION_API_PATH } from '@constants/apis';
import {
  LocationDistrictWebsiteDataType,
  LocationProvinceWebsiteDataType,
  LocationProvinceWebsiteFormDataType,
} from '@interfaces/Admin/locationTypes';
import { BaseGetListQueryType, ResponseWithMetaType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getProvinces = async (
  query?: BaseGetListQueryType,
): Promise<ResponseWithMetaType<LocationProvinceWebsiteDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.PROVINCES_PATH, {
    params: query,
  });
  return response.data;
};

const getAllProvinces = async (): Promise<LocationProvinceWebsiteDataType[]> => {
  const response = await getProvinces();
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

const getDistricts = async (
  query?: BaseGetListQueryType,
): Promise<ResponseWithMetaType<LocationDistrictWebsiteDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.DISTRICTS_PATH, {
    params: query,
  });

  return response.data;
};

const getAllDistricts = async (): Promise<LocationDistrictWebsiteDataType[]> => {
  const response = await getDistricts();
  return response.data;
};

const createDistrict = async (
  data: LocationProvinceWebsiteFormDataType,
): Promise<LocationProvinceWebsiteDataType> => {
  const response = await axiosInstance.post(ADMIN_LOCATION_API_PATH.DISTRICTS_PATH, data);
  return response.data.data;
};

const deleteDistrictByCode = async (code: string): Promise<void> => {
  await axiosInstance.delete(ADMIN_LOCATION_API_PATH.DISTRICT_PATH(code));
};

export {
  getProvinces,
  getAllProvinces,
  deleteProvinceByCode,
  createProvince,
  getDistricts,
  getAllDistricts,
  createDistrict,
  deleteDistrictByCode,
};
