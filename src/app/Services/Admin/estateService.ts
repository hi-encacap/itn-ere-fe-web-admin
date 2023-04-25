import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';
import { omit } from 'lodash';
import { Key } from 'react';

import { ADMIN_ESTATE_API_PATH } from '@constants/apis';
import { EstateDataType, EstateDraftDataType, EstateFormDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType, ResponseWithMetaType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const createEstate = async (estate: EstateFormDataType) => {
  const response = await axiosInstance.post(ADMIN_ESTATE_API_PATH.ESTATES_PATH, {
    ...omit(estate, 'id'),
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
    params: {
      ...queryParam,
      orderBy: 'upvotedAt',
    },
  });

  return response.data;
};

const unPublishEstateById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.post(ADMIN_ESTATE_API_PATH.ESTATE_UN_PUBLISH_PATH(id));

  return response.data.data;
};

const publishEstateById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.post(ADMIN_ESTATE_API_PATH.ESTATE_PUBLISH_PATH(id));

  return response.data.data;
};

const moveEstateToTopById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.post(ADMIN_ESTATE_API_PATH.ESTATE_MOVE_TO_TOP_PATH(id));

  return response.data.data;
};

const createEstateDraft = async (estate: EstateFormDataType): Promise<EstateDraftDataType> => {
  const response = await axiosInstance.post(
    ADMIN_ESTATE_API_PATH.ESTATE_DRAFTS_PATH,
    // Remove all empty, undefined values from the object.
    Object.fromEntries(Object.entries(estate).filter(([_, v]) => v !== '' && v !== undefined)),
  );

  return response.data.data;
};

const getEstateDrafts = async (
  queryParam?: BaseGetListQueryType,
): Promise<ResponseWithMetaType<EstateDraftDataType[]>> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_API_PATH.ESTATE_DRAFTS_PATH, {
    params: queryParam,
  });

  return response.data;
};

const getEstateDraftById = async (id: Key): Promise<EstateDraftDataType> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_API_PATH.ESTATE_DRAFT_PATH(id));

  return response.data.data;
};

const updateEstateDraftById = async (id: Key, estate: EstateFormDataType): Promise<EstateDraftDataType> => {
  const response = await axiosInstance.put(
    ADMIN_ESTATE_API_PATH.ESTATE_DRAFT_PATH(id),
    // Remove all empty, undefined values from the object.
    Object.fromEntries(Object.entries(estate).filter(([_, v]) => v !== '' && v !== undefined)),
  );

  return response.data.data;
};

const deleteEstateDraftById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.delete(ADMIN_ESTATE_API_PATH.ESTATE_DRAFT_PATH(id));

  return response.data.data;
};

const getEstateById = async (id: Key): Promise<EstateDataType> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_API_PATH.ESTATE_PATH(id));

  return response.data.data;
};

const updateEstateById = async (id: Key, estate: EstateFormDataType): Promise<EstateDataType> => {
  const response = await axiosInstance.put(ADMIN_ESTATE_API_PATH.ESTATE_PATH(id), {
    ...estate,
    avatarId: estate.avatar?.id,
    imageIds: estate.images?.map((image) => image.id),
    latitude: 1,
    longitude: 1,
  });

  return response.data.data;
};

const getEstateStatuses = async (): Promise<Array<Record<'name', string>>> => {
  return await new Promise((resolve) => {
    resolve([
      {
        name: ESTATE_STATUS_ENUM.PUBLISHED,
      },
      {
        name: ESTATE_STATUS_ENUM.UNPUBLISHED,
      },
    ]);
  });
};

export {
  createEstate,
  createEstateDraft,
  deleteEstateDraftById,
  getEstateById,
  getEstateDraftById,
  getEstateDrafts,
  getEstateStatuses,
  getEstates,
  moveEstateToTopById,
  publishEstateById,
  unPublishEstateById,
  updateEstateById,
  updateEstateDraftById,
};
