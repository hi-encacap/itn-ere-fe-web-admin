import { IBaseListQuery, IResponseWithMeta } from '@encacap-group/types/dist/base';
import { omit } from 'lodash';

import { ADMIN_ESTATE_PROPERTY_API_PATH } from '@constants/apis';
import { EstatePropertyDataType, EstatePropertyFormDataType } from '@interfaces/Admin/estateTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getEstateProperties = async (
  query: IBaseListQuery,
): Promise<IResponseWithMeta<EstatePropertyDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_PROPERTY_API_PATH.ESTATE_PROPERTIES_PATH, {
    params: query,
  });

  return response.data;
};

const getAllEstateProperties = async (query?: IBaseListQuery): Promise<EstatePropertyDataType[]> => {
  const response = await getEstateProperties(omit(query, ['page', 'perPage']));

  return response.data;
};

const createEstateProperty = async (data: EstatePropertyFormDataType): Promise<EstatePropertyDataType> => {
  const response = await axiosInstance.post(ADMIN_ESTATE_PROPERTY_API_PATH.ESTATE_PROPERTIES_PATH, data);

  return response.data;
};

const getEstateProperty = async (id: number): Promise<EstatePropertyDataType> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_PROPERTY_API_PATH.ESTATE_PROPERTY_PATH(id));

  return response.data.data;
};

const updateEstateProperty = async (
  id: number,
  data: EstatePropertyFormDataType,
): Promise<EstatePropertyDataType> => {
  const response = await axiosInstance.put(ADMIN_ESTATE_PROPERTY_API_PATH.ESTATE_PROPERTY_PATH(id), data);

  return response.data.data;
};

const deleteEstatePropertyById = async (id: number): Promise<void> => {
  await axiosInstance.delete(ADMIN_ESTATE_PROPERTY_API_PATH.ESTATE_PROPERTY_PATH(id));
};

export {
  createEstateProperty,
  deleteEstatePropertyById,
  getAllEstateProperties,
  getEstateProperties,
  getEstateProperty,
  updateEstateProperty,
};
