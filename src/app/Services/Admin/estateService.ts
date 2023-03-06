import { ADMIN_ESTATE_API_PATH } from '@constants/apis';
import { EstateModificationFormDataType } from '@interfaces/Admin/estateTypes';

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

export { createEstate };
