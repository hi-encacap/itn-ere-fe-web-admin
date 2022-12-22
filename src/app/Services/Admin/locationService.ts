import { ADMIN_LOCATION_API_PATH } from '@constants/apis';
import {
  LocationDistrictDataType,
  LocationDistrictGetListQueryType,
  LocationProvinceDataType,
  LocationProvinceWebsiteDataType,
  LocationProvinceWebsiteFormDataType,
  LocationWardWebsiteDataType,
  LocationWardWebsiteFormDataType,
} from '@interfaces/Admin/locationTypes';
import { BaseGetListQueryType, ResponseWithMetaType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getProvinces = async (
  query?: BaseGetListQueryType,
): Promise<ResponseWithMetaType<LocationProvinceDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.PROVINCES_PATH, {
    params: query,
  });
  return response.data;
};

const getAllProvinces = async (): Promise<LocationProvinceDataType[]> => {
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
  query?: LocationDistrictGetListQueryType,
): Promise<ResponseWithMetaType<LocationDistrictDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.DISTRICTS_PATH, {
    params: query,
  });

  return response.data;
};

const getAllDistricts = async (): Promise<LocationDistrictDataType[]> => {
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

const getWards = async (
  query?: BaseGetListQueryType,
): Promise<ResponseWithMetaType<LocationWardWebsiteDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.WARDS_PATH, {
    params: query,
  });

  return response.data;
};

const getAllWards = async (): Promise<LocationWardWebsiteDataType[]> => {
  const response = await getWards();
  return response.data;
};

const createWard = async (data: LocationWardWebsiteFormDataType): Promise<LocationWardWebsiteDataType> => {
  const response = await axiosInstance.post(ADMIN_LOCATION_API_PATH.WARDS_PATH, data);
  return response.data.data;
};

const deleteWardByCode = async (code: string): Promise<void> => {
  await axiosInstance.delete(ADMIN_LOCATION_API_PATH.WARD_PATH(code));
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
  getWards,
  getAllWards,
  createWard,
  deleteWardByCode,
};
