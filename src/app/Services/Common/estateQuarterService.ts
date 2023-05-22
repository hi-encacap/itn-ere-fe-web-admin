import { IEstateQuarter } from "@encacap-group/common/dist/re";

import { ESTATE_QUARTER_API_PATH } from "@constants/apis";

import axiosInstance from "@utils/Http/axiosInstance";

const getEstateQuarters = async (): Promise<IEstateQuarter[]> => {
  const response = await axiosInstance.get(ESTATE_QUARTER_API_PATH.ESTATE_QUARTERS_PATH);

  return response.data.data;
};

export { getEstateQuarters };
