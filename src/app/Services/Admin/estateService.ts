import { Key } from 'react';

import { ADMIN_ESTATE_API_PATH } from '@constants/apis';
import { EstateDataType, EstateModificationFormDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType, ResponseWithMetaType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const createEstate = async (estate: EstateModificationFormDataType) => {
  const response = await axiosInstance.post(ADMIN_ESTATE_API_PATH.ESTATES_PATH, {
    ...estate,
    avatarId: estate.avatar?.id,
    imageIds: estate.images?.map((image) => image.id),
    latitude: 1,
    longitude: 1,
  });

  return response.data.data;
};

const getEstates = async (
  queryParam: BaseGetListQueryType,
): Promise<ResponseWithMetaType<EstateDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_API_PATH.ESTATES_PATH, {
    params: queryParam,
  });

  return response.data;
};

const unPublishEstateById = async (id: Key) => {
  const response = await axiosInstance.post(ADMIN_ESTATE_API_PATH.ESTATE_UN_PUBLISH_PATH(id));

  return response.data.data;
};

const moveEstateToTopById = async (id: Key) => {
  const response = await axiosInstance.post(ADMIN_ESTATE_API_PATH.ESTATE_MOVE_TO_TOP_PATH(id));

  return response.data.data;
};

export { createEstate, getEstates, moveEstateToTopById, unPublishEstateById };
