import { IBaseListQuery, IResponseWithMeta } from "@encacap-group/common/dist/base";
import { ILocationDistrict, ILocationProvince } from "@encacap-group/common/dist/re";

import { ADMIN_LOCATION_API_PATH } from "@constants/apis";
import {
  LocationAddressBookDataType,
  LocationDistrictGetListQueryType,
  LocationProvinceWebsiteDataType,
  LocationProvinceWebsiteFormDataType,
  LocationWardGetListQueryType,
  LocationWardWebsiteDataType,
  LocationWardWebsiteFormDataType,
} from "@interfaces/Admin/locationTypes";
import axiosInstance from "@utils/Http/axiosInstance";

const getProvinces = async (query?: IBaseListQuery): Promise<IResponseWithMeta<ILocationProvince[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.PROVINCES_PATH, {
    params: query,
  });
  return response.data;
};

const getAllProvinces = async (): Promise<ILocationProvince[]> => {
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
): Promise<IResponseWithMeta<ILocationDistrict[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.DISTRICTS_PATH, {
    params: query,
  });

  return response.data;
};

const getAllDistricts = async (query?: LocationDistrictGetListQueryType): Promise<ILocationDistrict[]> => {
  const response = await getDistricts(query);
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
  query?: LocationWardGetListQueryType,
): Promise<IResponseWithMeta<LocationWardWebsiteDataType[]>> => {
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

const getAddressBooks = async (
  query?: IBaseListQuery,
): Promise<IResponseWithMeta<LocationAddressBookDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_LOCATION_API_PATH.ADDRESS_BOOKS_PATH, {
    params: query,
  });

  return response.data;
};

const getAllAddressBooks = async (): Promise<LocationAddressBookDataType[]> => {
  const response = await getAddressBooks();
  return response.data;
};

const deleteAddressBookById = async (id: number): Promise<void> => {
  await axiosInstance.delete(ADMIN_LOCATION_API_PATH.ADDRESS_BOOK_PATH(id));
};

export {
  createDistrict,
  createProvince,
  createWard,
  deleteAddressBookById,
  deleteDistrictByCode,
  deleteProvinceByCode,
  deleteWardByCode,
  getAddressBooks,
  getAllAddressBooks,
  getAllDistricts,
  getAllProvinces,
  getAllWards,
  getDistricts,
  getProvinces,
  getWards,
};
