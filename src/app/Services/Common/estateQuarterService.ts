import { ESTATE_QUARTER_API_PATH } from '@constants/apis';
import { EstateQuarterDataType } from '@interfaces/Common/estateQuarterTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getEstateQuarters = async (): Promise<EstateQuarterDataType[]> => {
  const response = await axiosInstance.get(ESTATE_QUARTER_API_PATH.ESTATE_QUARTERS_PATH);

  return response.data.data;
};

export { getEstateQuarters };
