import { omit } from 'lodash';

import { ADMIN_ESTATE_PROPERTY_API_PATH } from '@constants/apis';
import { EstatePropertyDataType, EstatePropertyFormDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType, ResponseWithMetaType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getEstateProperties = async (
  query: BaseGetListQueryType,
): Promise<ResponseWithMetaType<EstatePropertyDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_PROPERTY_API_PATH.ESTATE_PROPERTIES_PATH, {
    params: query,
  });

  return response.data;
};

const getAllEstateProperties = async (query?: BaseGetListQueryType): Promise<EstatePropertyDataType[]> => {
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
  getEstateProperties,
  getAllEstateProperties,
  getEstateProperty,
  createEstateProperty,
  updateEstateProperty,
  deleteEstatePropertyById,
};
