import { IBaseListQuery, IResponseWithMeta } from '@encacap-group/types/dist/base';
import { ESTATE_STATUS_ENUM, IEstate } from '@encacap-group/types/dist/re';
import { omit } from 'lodash';
import { Key } from 'react';

import { ADMIN_ESTATE_API_PATH } from '@constants/apis';
import { EstateDraftDataType, EstateFormDataType } from '@interfaces/Admin/estateTypes';

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

const getEstates = async (queryParam: IBaseListQuery): Promise<IResponseWithMeta<IEstate[]>> => {
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
  queryParam?: IBaseListQuery,
): Promise<IResponseWithMeta<EstateDraftDataType[]>> => {
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

const getEstateById = async (id: Key): Promise<IEstate> => {
  const response = await axiosInstance.get(ADMIN_ESTATE_API_PATH.ESTATE_PATH(id));

  return response.data.data;
};

const updateEstateById = async (id: Key, estate: EstateFormDataType): Promise<IEstate> => {
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
  return await Promise.resolve([
    {
      name: ESTATE_STATUS_ENUM.PUBLISHED,
    },
    {
      name: ESTATE_STATUS_ENUM.UNPUBLISHED,
    },
  ]);
};

const deleteEstateById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.delete(ADMIN_ESTATE_API_PATH.ESTATE_PATH(id));

  return response.data.data;
};

export {
  createEstate,
  createEstateDraft,
  deleteEstateById,
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
